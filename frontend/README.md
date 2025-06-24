# Fake News Detector

A web application for detecting fake news using Gemini AI API.

## UI Enhancements

The application features a modern, animated user interface with the following features:

- **Smooth animations** throughout the application using Framer Motion
- **Interactive components** with hover and tap animations
- **Animated progress bars** for visualizing data
- **Loading animations** for better user experience
- **Responsive design** that works on mobile and desktop
- **Beautiful gradients** and subtle shadows for depth and visual interest
- **AOS (Animate On Scroll)** for scroll-triggered animations
- **Lottie animations** for engaging visual feedback
- **Modern UI components** with attention to accessibility

## Features

- User authentication (register, login, logout)
- News credibility checking with AI analysis
- History tracking for checked news
- Admin panel for user management
- Statistics visualization
- Responsive design for desktop and mobile

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion, AOS, Lottie
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **AI Integration**: Gemini API for news analysis

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL database
- Gemini API key

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fake_news_detector
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. Run database setup script:
   ```
   node setup-db.js
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

### Default Admin Account

- Email: admin@example.com
- Password: admin123

## License

This project is licensed under the MIT License.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
