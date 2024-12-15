# PMO Virtual Interview Application

An interactive application designed to help aspiring PMO leaders understand and prepare for their roles through assessments, educational content, and practical resources.

## Features

- Interactive welcome page with video introduction
- Randomized quiz-based assessments
- Learning hub with tip sheets, videos, and downloadable resources
- Personalized recommendations based on quiz results
- Mobile-friendly interface
- Progress tracking
- Support system for user feedback

## Getting Started

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Deployment Options

#### 1. Docker Deployment
1. Build Docker image:
   ```bash
   docker build -t pmo-virtual-interview .
   ```

2. Run Docker container:
   ```bash
   docker-compose up -d
   ```

#### 2. Nginx Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Copy contents of `build/` to Nginx html directory:
   ```bash
   cp -R build/* /var/www/html/
   ```

#### 3. Cloud Platforms
- **Vercel**: 
  ```bash
  vercel
  ```
- **Netlify**:
  ```bash
  netlify deploy
  ```
- **AWS Amplify**:
  ```bash
  amplify publish
  ```

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/pages` - Page components
  - `/assets` - Static assets
  - `/utils` - Utility functions
  - `/context` - React context providers
  - `/hooks` - Custom React hooks

## Environment Variables
Create a `.env` file with:
```
REACT_APP_API_URL=https://your-api-endpoint.com
REACT_APP_AUTH_TOKEN=your_secret_token
```

## Performance Optimization
- Lazy loading implemented
- Code splitting enabled
- Minimal external dependencies

## Troubleshooting
- Ensure Node.js 18+ is installed
- Clear browser cache if experiencing issues
- Check console for any error messages

## Support

For enterprise support or custom implementations:
- Email: support@dowpublishingllc.com
- Website: www.dowpublishingllc.com

## License
Proprietary - 2024 Dow Publishing LLC. All Rights Reserved.
