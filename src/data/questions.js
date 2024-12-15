export const pmoCategories = [
  'Strategic Planning',
  'Resource Management',
  'Risk Management',
  'Stakeholder Management',
  'Portfolio Optimization',
  'Governance',
  'Change Management',
  'PMO Maturity',
  'Crisis Management',
  'Organizational Development'
];

export const questions = [
  // Strategic Planning Questions
  {
    category: 'Strategic Planning',
    question: 'Your organization is struggling with project prioritization, resulting in resource conflicts and missed strategic objectives. As the PMO leader, how would you address this systemic issue?',
    options: [
      'Implement a scoring model based purely on financial metrics (ROI, NPV)',
      'Create a comprehensive portfolio prioritization framework incorporating strategic alignment, risk, resource availability, and business value',
      'Let each department head decide their project priorities independently',
      'Prioritize projects solely based on executive preferences'
    ],
    correctAnswer: 1,
    explanation: 'A comprehensive prioritization framework ensures objective decision-making aligned with organizational strategy. It should consider multiple factors including strategic alignment, resource constraints, risks, and business value. This approach promotes transparency and helps balance competing demands across the organization.',
    learningPoints: [
      'Portfolio prioritization requires a multi-dimensional approach',
      'Strategic alignment is crucial for project selection',
      'Resource capacity must be considered in prioritization',
      'Objective criteria help reduce political influence in project selection'
    ],
    guidance: 'Think about what makes project prioritization effective. Consider the different stakeholders involved and what factors would lead to balanced, objective decisions that serve the entire organization\'s needs.'
  },
  {
    category: 'Resource Management',
    question: 'Your organization is experiencing critical resource bottlenecks across multiple high-priority projects. Key technical experts are overallocated by 150%. What is your approach to resolving this crisis?',
    options: [
      'Simply delay all project timelines to match resource availability',
      'Develop a comprehensive resource optimization strategy including skills assessment, cross-training programs, and potential external partnerships',
      'Hire additional resources immediately',
      'Continue projects with internal resources only'
    ],
    correctAnswer: 1,
    explanation: 'A comprehensive resource optimization strategy addresses both immediate and long-term needs. It includes analyzing skill gaps, developing internal capabilities, and establishing sustainable resource management practices.',
    learningPoints: [
      'Resource optimization requires both tactical and strategic solutions',
      'Cross-training reduces key person dependencies',
      'External partnerships can provide flexibility',
      'Resource management should be proactive, not reactive'
    ],
    guidance: 'Think about both the immediate crisis and long-term sustainability. What combination of solutions would address current bottlenecks while preventing similar issues in the future?'
  },
  {
    category: 'Risk Management',
    question: 'A major technology project is 70% complete when a critical security vulnerability is discovered in the core architecture. The fix will require significant rework and delay. How do you proceed?',
    options: [
      'Continue with the current architecture and address security through operational controls',
      'Conduct a comprehensive impact analysis, engage stakeholders, and develop a risk-based action plan that considers business impact, security requirements, and project constraints',
      'Immediately halt the project and start over with new architecture',
      'Implement a partial fix that minimizes project delay'
    ],
    correctAnswer: 1,
    explanation: 'A risk-based approach ensures security concerns are properly addressed while considering project constraints and business impacts. This requires careful analysis and stakeholder engagement to make informed decisions.',
    learningPoints: [
      'Security risks require thorough impact analysis',
      'Stakeholder engagement is crucial in risk response planning',
      'Risk responses should consider multiple factors',
      'Technical debt must be carefully evaluated'
    ],
    guidance: 'Think about the implications of a critical security vulnerability. What steps would you take to address the issue while considering the project\'s constraints and business impacts?'
  },
  {
    category: 'Stakeholder Management',
    question: 'A critical stakeholder with significant influence is actively undermining PMO initiatives and creating resistance among other stakeholders. How do you address this challenge?',
    options: [
      'Ignore the stakeholder and focus on supportive groups',
      'Develop a targeted stakeholder engagement strategy including root cause analysis, one-on-one engagement, value demonstration, and coalition building',
      'Escalate the issue to senior management immediately',
      'Modify PMO initiatives to match the stakeholder\'s preferences'
    ],
    correctAnswer: 1,
    explanation: 'Effective stakeholder management requires understanding and addressing stakeholder concerns while maintaining PMO objectives. This includes targeted engagement and communication strategies.',
    learningPoints: [
      'Stakeholder resistance often has underlying causes',
      'One-on-one engagement can be more effective',
      'Coalition building helps manage resistance',
      'Value demonstration is crucial for buy-in'
    ],
    guidance: 'Consider the impact of a resistant stakeholder on PMO initiatives. What strategies would you use to understand and address their concerns while maintaining PMO objectives?'
  },
  {
    category: 'Portfolio Optimization',
    question: 'Your organization\'s project portfolio has grown organically, resulting in redundant initiatives and inefficient resource utilization. How do you optimize the portfolio?',
    options: [
      'Cancel all projects and start fresh',
      'Conduct a systematic portfolio analysis including strategic alignment, interdependencies, resource utilization, and value delivery, then develop an optimization roadmap',
      'Continue all projects but with reduced budgets',
      'Only optimize troubled projects'
    ],
    correctAnswer: 1,
    explanation: 'Portfolio optimization requires a systematic approach to evaluate and balance the entire project portfolio. This includes analyzing strategic alignment, dependencies, resource usage, and value delivery to make informed decisions.',
    learningPoints: [
      'Portfolio optimization requires systematic analysis',
      'Strategic alignment is key to portfolio decisions',
      'Resource utilization must be considered holistically',
      'Dependencies impact optimization decisions'
    ],
    guidance: 'Think about the challenges of optimizing a large, organically grown portfolio. What steps would you take to systematically evaluate and improve the portfolio\'s efficiency and effectiveness?'
  },
  {
    category: 'Governance',
    question: 'Your organization is experiencing frequent scope creep, budget overruns, and unclear decision-making processes. How do you establish effective governance?',
    options: [
      'Implement rigid control processes for all projects',
      'Design a scalable governance framework with clear roles, decision rights, control gates, and escalation paths, tailored to project size and complexity',
      'Let project managers handle governance individually',
      'Focus governance only on high-value projects'
    ],
    correctAnswer: 1,
    explanation: 'Effective governance requires clear structures and processes that are appropriate for different types of projects. A scalable framework ensures adequate control without unnecessary bureaucracy.',
    learningPoints: [
      'Governance should be scalable and appropriate',
      'Clear decision rights are essential',
      'Control gates help manage project progression',
      'Escalation paths must be well-defined'
    ],
    guidance: 'Think about the challenges of establishing effective governance. What approach would provide clear structures and processes for decision-making and control, tailored to different project types?'
  },
  {
    category: 'Change Management',
    question: 'A major digital transformation program is facing significant resistance from middle management, threatening its success. How do you address this?',
    options: [
      'Proceed with implementation regardless of resistance',
      'Implement a comprehensive change management strategy including stakeholder analysis, impact assessment, targeted communication, and engagement programs',
      'Scale back the transformation scope',
      'Replace resistant managers'
    ],
    correctAnswer: 1,
    explanation: 'Successful change management requires understanding and addressing stakeholder concerns while maintaining program objectives. This includes targeted engagement and communication strategies.',
    learningPoints: [
      'Middle management buy-in is crucial for change',
      'Change resistance requires structured response',
      'Communication must be targeted and effective',
      'Stakeholder engagement drives change success'
    ],
    guidance: 'Consider the challenges of managing change resistance. What strategies would you use to understand and address stakeholder concerns while maintaining program objectives?'
  },
  {
    category: 'PMO Maturity',
    question: 'Your PMO is perceived as bureaucratic and not adding value. How do you transform it into a strategic enabler?',
    options: [
      'Reduce all PMO oversight and control',
      'Develop a PMO transformation strategy focusing on value delivery, capability building, and strategic alignment while streamlining processes',
      'Maintain current processes but improve documentation',
      'Focus solely on project execution metrics'
    ],
    correctAnswer: 1,
    explanation: 'PMO transformation requires focusing on value delivery while building organizational capabilities. This includes streamlining processes and demonstrating strategic value.',
    learningPoints: [
      'PMOs must demonstrate clear value',
      'Capability building is essential for maturity',
      'Process efficiency impacts PMO perception',
      'Strategic alignment enhances PMO value'
    ],
    guidance: 'Think about the challenges of transforming a PMO. What strategies would help shift the PMO\'s focus towards value delivery, capability building, and strategic alignment while improving efficiency?'
  },
  {
    category: 'Crisis Management',
    question: 'Multiple critical projects are severely impacted by an unexpected vendor bankruptcy. How do you manage this crisis?',
    options: [
      'Wait for legal proceedings to conclude',
      'Activate crisis response plan including impact assessment, stakeholder communication, alternative vendor evaluation, and risk mitigation strategies',
      'Immediately switch to new vendors',
      'Continue projects with internal resources only'
    ],
    correctAnswer: 1,
    explanation: 'Crisis management requires a structured response that addresses immediate impacts while developing sustainable solutions. This includes clear communication and risk mitigation strategies.',
    learningPoints: [
      'Crisis response requires immediate and structured action',
      'Impact assessment guides response priorities',
      'Stakeholder communication is critical in crisis',
      'Alternative solutions need careful evaluation'
    ],
    guidance: 'Consider the urgency of a crisis situation. What steps would you take to address the immediate impacts while developing sustainable solutions and communicating effectively with stakeholders?'
  },
  {
    category: 'Organizational Development',
    question: 'Your organization needs to rapidly mature its project management capabilities while managing an increasing project load. How do you approach this challenge?',
    options: [
      'Focus only on current project delivery',
      'Create an integrated capability development program including skills assessment, training pathways, mentoring programs, and performance metrics',
      'Hire experienced project managers only',
      'Implement strict project management processes'
    ],
    correctAnswer: 1,
    explanation: 'Building organizational capability requires a comprehensive approach that includes both individual and organizational development while maintaining current operations.',
    learningPoints: [
      'Capability building requires systematic approach',
      'Training must align with organizational needs',
      'Mentoring accelerates capability development',
      'Performance metrics guide improvement'
    ],
    guidance: 'Think about the challenges of rapidly maturing project management capabilities. What strategies would you use to develop both individual and organizational capabilities while maintaining current operations?'
  },
  {
    category: 'People Management',
    question: 'A key team member is experiencing persistent performance issues that are impacting project delivery. What is your approach?',
    options: [
      'Immediately terminate their employment',
      'Implement a structured performance improvement plan with clear milestones, regular feedback, potential role adjustments, and support resources',
      'Move them to a different project without addressing the performance issues',
      'Reduce their responsibilities without explanation'
    ],
    correctAnswer: 1,
    explanation: 'Performance issues require a systematic, supportive approach that provides clear expectations, feedback, and opportunities for improvement before considering termination.',
    learningPoints: [
      'Performance improvement plans should be clear and actionable',
      'Regular feedback is crucial for performance management',
      'Role adjustments can help address underlying performance challenges',
      'Support resources can help employees overcome obstacles'
    ],
    guidance: 'Think about the root causes of performance issues. How can you provide support and create an environment that enables team members to succeed?'
  },
  {
    category: 'People Management',
    question: 'Your team is experiencing low morale and high turnover. How do you address this systemic issue?',
    options: [
      'Ignore the problem and hope it resolves itself',
      'Conduct a comprehensive organizational culture assessment, develop targeted engagement strategies, implement feedback mechanisms, and create professional development opportunities',
      'Offer small, one-time bonuses',
      'Blame individual team members for low morale'
    ],
    correctAnswer: 1,
    explanation: 'Addressing team morale requires a holistic approach that involves understanding root causes, creating meaningful engagement strategies, and investing in team development.',
    learningPoints: [
      'Organizational culture significantly impacts team performance',
      'Regular feedback mechanisms are crucial for understanding team dynamics',
      'Professional development opportunities boost engagement',
      'Targeted engagement strategies can transform team culture'
    ],
    guidance: 'Consider the complex factors that contribute to team morale. How can you create an environment that supports, motivates, and develops your team members?'
  },
  {
    category: 'People Management',
    question: 'You notice a high-performing team member has potential for leadership but lacks some critical skills. How do you approach their development?',
    options: [
      'Promote them immediately to a leadership role',
      'Develop a comprehensive leadership development program including targeted training, mentorship, stretch assignments, and leadership coaching',
      'Tell them to develop leadership skills on their own',
      'Assume they are not ready for leadership and overlook their potential'
    ],
    correctAnswer: 1,
    explanation: 'Identifying and nurturing leadership potential requires a structured, supportive approach. This involves providing targeted development opportunities, mentorship, and ongoing feedback.',
    learningPoints: [
      'Leadership potential requires intentional development',
      'Targeted training programs accelerate skill growth',
      'Mentorship and coaching are crucial for leadership development',
      'Stretch assignments provide practical leadership experience'
    ],
    guidance: 'Consider how you can invest in your team\'s potential. What specific steps can you take to help promising team members grow into future leaders?'
  }
];
