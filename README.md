## Node.js To-Do App with Express and MongoDB
This is a simple To-Do App built using Node.js, Express, and MongoDB. It incorporates various packages like `cookie`, `express sessions`, `flash messages`, and `bcrypt` for added functionality and security.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Project Setup

1. **Clone the repository using following command**
   -- https://github.com/SaradBhatta12/Full-Stack-ToDo-app.git

2. ** cd Full-Stack-ToDo-app
   
3. ** npm install
   
3. ** Configure environment variables
    --PORT=3000
    --MONGODB_URI=mongodb://localhost:27017/todoapp
    --SESSION_SECRET=your_session_secret
   
4. **Run The Application
    --npm start

   -----The app will be running on http://localhost:3000.---


### Features

1. User Authentication: Register and login with secure password storage using bcrypt.
2. Session Management: Utilizes express sessions for user session management.
3. Flash Messages: Display informative flash messages for user interactions.
4. MongoDB Integration: Persists tasks and user data in a MongoDB database.
5. Cookie Handling: Uses cookie package for convenient cookie manipulation.
   
### Project Structure

- app.js: Main entry point of the application.
- config/: Configuration files for MongoDB and session management.
- controllers/: Logic for handling HTTP requests and business logic.
- middlewares/: Custom middlewares for authentication and flash messages.
- models/: MongoDB data models for tasks and users.
- public/: Static files such as stylesheets and client-side JavaScript.
- routes/: Defines routes for different parts of the application.
- views/: EJS templates for rendering HTML pages.
  
#### Usage

- Register or Log in: Create an account or log in if you already have one.
- Add Tasks: Create and manage your to-do list by adding tasks.
- Mark as Completed: Mark tasks as completed when you finish them.
- Log Out: Securely log out from your account.
  
#### Security Considerations

- User passwords are securely hashed using bcrypt.
- Session data is stored securely with a session secret.
- Flash messages enhance user feedback and experience.


  
