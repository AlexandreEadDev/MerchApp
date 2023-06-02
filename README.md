## Merch App - Shoe Store

This is a merch app built using React, Node.js, and Express. It is designed to showcase various shoe products. The app consists of two sides: the client and the server.

## Client

The client side of the app is responsible for rendering the user interface and interacting with the server to fetch data. It utilizes the following technologies and features:

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for managing application state.
- **React Router**: A routing library for declarative routing in React applications.
- **Responsive CSS**: Stylesheets for creating a responsive layout.
- **React Toastify**: A notification library for displaying toast messages.

#### Screens

The client includes several screens, each serving a specific purpose:

- **Home**: Displays the main landing page and showcases shoe products.
- **SingleProduct**: Shows detailed information about a specific shoe product.
- **Login**: Provides a login form for users to authenticate themselves.
- **Register**: Allows new users to create an account.
- **Profile**: Shows user profile information and allows for editing.
- **Cart**: Displays the contents of the user's shopping cart.
- **Shipping**: Allows users to enter shipping information.
- **Payment**: Provides a payment interface for users to complete their purchase.
- **PlaceOrder**: Confirms the user's order and displays an order summary.
- **Order**: Shows detailed information about a specific order.
- **NotFound**: Displays a 404 page when a route is not found.

#### Getting Started

To run the client side of the app, follow these steps:

1. Install the required dependencies by running `npm install`.
2. Start the development server using `npm start`.
3. Access the app in your browser at `http://localhost:3000`.

## Server

The server side of the app handles data storage, authentication, and the API for interacting with the client. It utilizes the following technologies and features:

- **Express**: A fast and minimalist web framework for Node.js.
- **MongoDB**: A popular NoSQL database for storing app data.
- **Mongoose**: An object data modeling (ODM) library for MongoDB and Node.js.
- **dotenv**: A module for loading environment variables from a `.env` file.

#### Routes

The server includes the following routes:

- **ProductRoutes**: Handles API requests related to shoe products.
- **UserRoutes**: Handles API requests related to user authentication and profiles.
- **OrderRoutes**: Handles API requests related to orders.

#### Configuration

The server uses a MongoDB database to store app data. To configure the app, follow these steps:

1. Create a `.env` file in the root directory of the server.
2. Add the required environment variables, such as the MongoDB connection URL and PayPal client ID.
-MONGODB_URL=<your_mongodb_url>
-PAYPAL_CLIENT_ID=<your_paypal_client_id>


#### Getting Started

To run the server side of the app, follow these steps:

1. Install the required dependencies by running `npm install`.
2. Start the server using `npm start`.
3. The server will be available at `http://localhost:1000`.

## Usage

- Access the client side of the app by visiting `http://localhost:3000` in your browser.
- Note: This app is for demonstration purposes only. It does not provide real purchasing functionality.

## Contributions and Feedback

Contributions, suggestions, and improvements are highly encouraged! If you have any ideas to enhance the code or any feedback to share, please feel free to open an issue or submit a pull request on the GitHub repository. Your input is greatly appreciated and will help make this app even better.

## Disclaimer

This app is a demonstration and does not represent a real e-commerce site. You cannot purchase the showcased shoes through this app.

