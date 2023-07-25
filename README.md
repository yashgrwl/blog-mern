# Blog Management Project

The Blog Management Project is a web application that allows users to create, read, and manage their blogs. Built using the MERN (MongoDB, Express.js, React.js, and Node.js) stack, this project offers a user-friendly interface for seamless blogging and content management.

## Features

- **User Registration and Login:** New users can create an account and existing users can log in securely to access their blogs.

- **Create and Edit Blogs:** Authenticated users can create new blogs and edit their existing ones. The blog editor supports rich text formatting, making it easy to create engaging and visually appealing content.

- **View Existing Blogs:** All users, including non-registered visitors, can read and view blogs created by other users. Blogs are presented in a clean and organized layout for easy consumption.

- **Author Identification:** Each blog is associated with the username of its creator, allowing readers to identify the authors of the blogs they are reading.

- **User Authentication and Authorization:** The project implements JWT (JSON Web Tokens) for user authentication and authorization, ensuring secure access to user-specific features and preventing unauthorized access.

- **Responsive Design:** The application is designed with a responsive layout, ensuring a seamless user experience across various devices, including desktops, tablets, and smartphones.

## Technologies Used

- Frontend: React.js, HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB

## Getting Started

To run the Blog Management Project locally, follow these steps:

1. Clone the repository:

git clone https://github.com/yashgrwl/blog-mern.git


2. Install dependencies for the frontend and backend:

cd blog-mern/client && npm install
cd ../api && npm install
cd blog-mern/client && npm start
cd ../api && npm start

5. Open your web browser and go to `http://localhost:3000` to access the application.

## Project Structure

The project follows the standard MERN stack structure:

- `/client`: Contains the frontend code built with React.js and related files.
- `/api`: Contains the backend code written with Node.js and Express.js and related files.
