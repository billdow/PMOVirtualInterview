import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { 
  CheckCircle, 
  Cancel,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  ErrorOutline as ErrorIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { questions as pmoQuestions, pmoCategories } from '../data/questions';
import { useNavigate } from 'react-router-dom';

const questions = pmoQuestions;

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questionsState, setQuestionsState] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  useEffect(() => {
    // Shuffle questions on component mount
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestionsState(shuffledQuestions);
  }, []);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      setFeedback('Please select an answer before proceeding.');
      return;
    }

    const currentQuestion = questionsState[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer.toString();
    
    if (!answered) {
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
        setFeedback('Correct!');
      } else {
        setIncorrectAnswers(prev => [...prev, {
          question: currentQuestion.question,
          category: currentQuestion.category,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: selectedAnswer,
          explanation: currentQuestion.explanation || 'Review this topic in the learning materials.'
        }]);
        setFeedback('That\'s not quite right. Here\'s a hint to help you think about this topic:');
        setShowGuidance(true);
      }
      setAnswered(true);
      return;
    }

    // Move to next question or show results
    if (currentQuestionIndex < questionsState.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer('');
      setAnswered(false);
      setFeedback('');
      setShowGuidance(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetake = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestionsState(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    setAnswered(false);
    setFeedback('');
    setIncorrectAnswers([]);
  };

  const generateLearningRecommendations = () => {
    // Group incorrect answers by category
    const categoryMistakes = incorrectAnswers.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || [];
      acc[curr.category].push(curr);
      return acc;
    }, {});

    return Object.entries(categoryMistakes).map(([category, mistakes]) => ({
      category,
      count: mistakes.length,
      recommendations: [
        `Review ${category} fundamentals in the Learning Hub`,
        ...mistakes.map(m => m.explanation).filter((v, i, a) => a.indexOf(v) === i) // Unique explanations
      ]
    }));
  };

  const handleExitConfirm = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleExitAssessment = () => {
    setOpenDialog(false);
    navigate('/');
  };

  if (questionsState.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
        </Box>
      </Container>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questionsState.length) * 100);
    const recommendations = generateLearningRecommendations();
    
    let overallMessage = '';
    if (percentage >= 90) {
      overallMessage = 'Excellent! You have a strong understanding of PMO leadership principles.';
    } else if (percentage >= 70) {
      overallMessage = 'Good job! You have a solid foundation in PMO concepts.';
    } else if (percentage >= 50) {
      overallMessage = 'You\'re on the right track, but there\'s room for improvement.';
    } else {
      overallMessage = 'Consider reviewing the learning materials to strengthen your PMO knowledge.';
    }

    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Assessment Complete!
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            Your Score: {score} out of {questionsState.length} ({percentage}%)
          </Typography>
          
          <Typography variant="body1" paragraph>
            {overallMessage}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {incorrectAnswers.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Areas for Improvement
              </Typography>
              
              <List>
                {recommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={rec.category}
                      secondary={
                        <Box component="span">
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {rec.count} question{rec.count > 1 ? 's' : ''} missed in this category
                          </Typography>
                          <List dense>
                            {rec.recommendations.map((recommendation, idx) => (
                              <ListItem key={idx} sx={{ pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: '30px' }}>
                                  <TrendingUpIcon fontSize="small" color="secondary" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={recommendation}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Alert severity="info" sx={{ mt: 3 }}>
                Visit the Learning Hub to access materials related to these topics and improve your knowledge.
              </Alert>
            </>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRetake}
            >
              Retake Assessment
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/learning-hub')}
            >
              Visit Learning Hub
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  const currentQuestion = questionsState[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questionsState.length) * 100;
  const currentScore = Math.round((score / (currentQuestionIndex + (answered ? 1 : 0))) * 100) || 0;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Question {currentQuestionIndex + 1} of {questionsState.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Progress: {Math.round(progress)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Current Score: {currentScore}%
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>
          {currentQuestion.question}
        </Typography>

        <FormControl component="fieldset" sx={{ width: '100%', my: 2 }}>
          <RadioGroup
            value={selectedAnswer}
            onChange={handleAnswerSelect}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index.toString()}
                control={<Radio />}
                label={option}
                disabled={answered}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {feedback && (
          <Alert 
            severity={feedback.includes('Correct') ? 'success' : 'info'} 
            sx={{ mb: 2 }}
          >
            {feedback}
          </Alert>
        )}

        {showGuidance && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'info.main', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LightbulbIcon sx={{ mr: 1, color: 'white' }} />
              <Typography variant="subtitle1" sx={{ color: 'white' }}>
                Guidance
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'white' }}>
              {currentQuestion.guidance}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            fullWidth
          >
            {answered ? 
              (currentQuestionIndex < questionsState.length - 1 ? 'Next Question' : 'Show Results') 
              : 'Check Answer'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleExitConfirm}
          >
            Exit Assessment
          </Button>
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
        >
          <DialogTitle>Exit Assessment?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to exit? Your progress will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleExitAssessment} color="primary">
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Assessment;
