# YouTube Backend 

This project is a complete backend implementation of a YouTube clone using Node.js and Express.js and MongoDB. It includes models for user, comment, like, playlist, subscription, tweet (used as community post), and video. The main app runs on `http://localhost:8000/api/v1`.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [Controllers and Routes](#controllers-and-routes)
- [Dependencies](#dependencies)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Cloudinary
- Bcrypt
- JSON Web Tokens (JWT)
- Mongoose

## Installation
1. Clone the repository:
    ```bash
    git clone git@github.com:priyanshusinha11/youtube-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd youtube-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    PORT=your_port
    MONGODB_URI=your_mongodb_uri
    CORS_ORIGIN=your_cors_origin
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=your_access_token_expiry
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```
2. The API will be running at `http://localhost:8000/api/v1`.

## Models
- **User**: Manages user data and authentication.
- **Comment**: Handles comments on videos.
- **Like**: Manages likes on videos and comments.
- **Playlist**: Manages user-created playlists.
- **Subscription**: Handles subscriptions to channels.
- **Tweet**: Used as community posts.
- **Video**: Manages video data.

## Controllers and Routes
- **UserController**: Manages user-related operations.
- **CommentController**: Handles operations related to comments.
- **LikeController**: Manages likes-related operations.
- **PlaylistController**: Handles playlist-related operations.
- **SubscriptionController**: Manages subscriptions.
- **TweetController**: Handles community posts operations.
- **VideoController**: Manages video-related operations.

## Dependencies
- **bcrypt**: Used for hashing passwords for secure storage.
- **cloudinary**: Utilized for uploading video files, avatars, and cover images to the cloud for higher efficiency.
- **cookie-parser**: Parses cookies attached to the client request object.
- **jsonwebtoken**: Used for creating and verifying JSON Web Tokens for authentication.
- **mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **mongoose-aggregate-paginate**: Adds pagination functionality to Mongoose aggregation queries.
- **multer**: A middleware for handling `multipart/form-data`, used for uploading files.


