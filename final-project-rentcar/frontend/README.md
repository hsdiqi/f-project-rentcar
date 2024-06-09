**Rental Mobi Web Application**

## Overview
This repository contains the source code for a web application for renting cars. Users can browse available cars, make reservations, and manage their bookings through this platform.

## Installation

### Backend
1. **Express**: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
   ```
   npm install express
   ```

2. **OracleDB**: OracleDB is the Oracle Database driver for Node.js.
   ```
   npm install oracledb
   ```

3. **JWT (JSON Web Tokens)**: JWT is used for authentication and authorization purposes.
   ```
   npm install jsonwebtoken
   ```

4. **CORS (Cross-Origin Resource Sharing)**: CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
   ```
   npm install cors
   ```

5. **Nodemon**: Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
   ```
   npm install nodemon --save-dev
   ```

### Frontend
1. **React.js**: React is a JavaScript library for building user interfaces.
   ```
   npx create-react-app rental-mobi
   ```

2. **JWT (JSON Web Tokens)**: Same as in backend, JWT is used for authentication and authorization purposes in the frontend as well.
   ```
   npm install jsonwebtoken
   ```

3. **React Router DOM**: React Router is a standard library for routing in React applications.
   ```
   npm install react-router-dom
   ```

4. **Axios**: Axios is a promise-based HTTP client for the browser and Node.js.
   ```
   npm install axios
   ```

## Backend Structure
- **server.js**: Entry point for the backend server.

## Frontend Structure
- **src/**: Contains all the source code for the frontend.
  - **components/**: Reusable React components.
  - **pages/**: Different pages of the application.
  - **services/**: API service functions for making HTTP requests.
  - **assets/**: Images, fonts, etc.
  - **App.js**: Main component where routing is defined.
  - **index.js**: Entry point for the React application.

## Running the Application
1. **Backend**: Navigate to the backend directory and run the following command to start the server using Nodemon:
   ```
   npm run dev
   ```

2. **Frontend**: Navigate to the frontend directory and run the following command to start the React development server:
   ```
   npm start
   ```

## Usage
1. **Register/Login**: Users can register or login to their accounts.
2. **Browse Cars**: Users can browse available cars with details like model, price, etc.
3. **Make Reservation**: Users can select a car and make a reservation by specifying pickup and drop-off dates.
4. **Manage Bookings**: Users can view and manage their bookings, including canceling reservations if needed.

## Developer Team
- Hasbi Ash Shiddiqi (202210370311391)
- Andika Salsabillah (202210370311406)
- Rusdany Maestro (202210370311402)
- Dharma Putra (202210370311365)
- Abdul Salam (202210370311367)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.