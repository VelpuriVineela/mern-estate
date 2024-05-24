
# MERN Real Estate Website

Explore and manage real estate properties with this comprehensive MERN Real Estate Website! Browse, search, and filter properties, view detailed information, and manage your listings with ease. This application provides a user-friendly interface and real-time updates for both property seekers and agents.


## Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [Contributing](#contributing)
- [Hosted Link](#hosted-link)


## Introduction

The MERN Real Estate Website is a full-stack web application designed to facilitate the buying, selling, and renting of real estate properties. It provides a seamless experience for both property seekers and agents with features like property listings, detailed property views, and user management.

## Demo

Watch the demo video:

[Google Drive](https://drive.google.com/file/d/13Rsudj5KmGvIDdzLUBDqITE86r2OHeb6/view?usp=drive_link)


## Project Structure

```bash
MERN-ESTATE/
├── api/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── listing.controller.js
│   │   ├── user.controller.js
│   ├── models/
│   │   ├── listing.model.js
│   │   ├── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── listing.route.js
│   │   ├── user.route.js
│   ├── utils/
│   │   ├── error.js
│   │   ├── verifyUser.js
│   ├── index.js
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Contact.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ListingItem.jsx
│   │   │   ├── OAuth.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── CreateListing.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Listing.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── UpdateListing.jsx
│   │   ├── redux/
│   │   │   ├── user/
│   │   │   │   ├── userSlice.js
│   │   │   ├── store.js
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   ├── main.jsx
```


## Features

- **User Authentication**: Secure login and signup functionality.
- **Property Listings**: Browse, search, and filter properties.
- **Property Details**: View detailed information about properties.
- **User Dashboards**: Manage favorites and listed properties.
- **Admin Panel**: Manage users and property listings.
- **Responsive Design**: A user-friendly interface that works on all devices.



## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/mern-estate.git
    cd mern-estate
    ```

2. **Install server dependencies:**

    ```bash
    cd api
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `api` directory and add the following variables:

    ```plaintext
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```


## Usage

1. **Run the server:**

    ```bash
    cd api
    npm start
    ```

2. **Run the client:**

    ```bash
    cd ../client
    npm start
    ```

    The application should now be running at `http://localhost:3000`.

## API Endpoints

- **Auth Routes:**
  - `POST /api/auth/signup`: Register a new user
  - `POST /api/auth/login`: Login a user

- **User Routes:**
  - `GET /api/users`: Get all users
  - `GET /api/users/:id`: Get a user by ID
  - `PUT /api/users/:id`: Update a user
  - `DELETE /api/users/:id`: Delete a user

- **Listing Routes:**
  - `GET /api/listings`: Get all listings
  - `GET /api/listings/:id`: Get a listing by ID
  - `POST /api/listings`: Create a new listing
  - `PUT /api/listings/:id`: Update a listing
  - `DELETE /api/listings/:id`: Delete a listing

## Technologies

- **Frontend:**
  - React
  - Redux
  - Firebase for authentication
  - CSS

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication



## Models

### User Model (`user.model.js`)

```javascript
import mongoose from "mongoose";

// Schema or rules
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true } // records the time of creation and updation
);

// model
const User = mongoose.model("User", userSchema);

export default User;

```

### Listing Model (`listing.model.js`)

```javascript
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    // rent or sale
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
```


## Contributing

Contributions are welcome! If you would like to contribute to the MERN Real Estate Website, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure all tests pass.
4. Create a pull request with a clear description of your changes.


## Hosted Link

https://mern-estate-06vg.onrender.com/
