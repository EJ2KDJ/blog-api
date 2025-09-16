# Blog API

A RESTful API for a personal blog application built with Node.js, Express, and PostgreSQL. This API provides CRUD operations for users, posts, and categories with proper database relationships.

## Features

- **User Management**: Create, read, update, and delete users
- **Post Management**: Full CRUD operations for blog posts
- **Category System**: Posts can be assigned to multiple categories
- **Database Relationships**: Proper associations between users, posts, and categories
- **Input Validation**: Server-side validation for required fields
- **Error Handling**: Comprehensive error handling and status codes
- **Transaction Support**: Database transactions for data integrity
- **Testing Suite**: Comprehensive test coverage using Mocha and Chai

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Testing**: Mocha, Chai, chai-http
- **Other**: CORS for cross-origin requests

## Database Schema

### Users
- `id` (Primary Key)
- `name` (String, Required)
- `email` (String, Required)
- `createdAt` (Date)
- `updatedAt` (Date)

### Posts
- `id` (Primary Key)
- `userId` (Foreign Key to Users)
- `postTitle` (String, Required)
- `body` (Text, Required)
- `createdAt` (Date)
- `updatedAt` (Date)

### Categories
- `id` (Primary Key)
- `name` (String)
- `createdAt` (Date)
- `updatedAt` (Date)

### PostCategories (Junction Table)
- `id` (Primary Key)
- `postsId` (Foreign Key to Posts)
- `categoryId` (Foreign Key to Categories)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/EJ2KDJ/blog-api.git
cd blog-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up PostgreSQL database:
   - Create a PostgreSQL database named `blog-db`
   - Update database credentials in `sequelize/config/config.json`

4. Run database migrations:
```bash
npx sequelize-cli db:migrate
```

5. Start the server:
```bash
npm start
# or
node server.js
```

The server will run on `http://localhost:4001`

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

#### Create User Example:
```json
POST /users
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create new post |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

#### Create Post Example:
```json
POST /posts
{
  "postTitle": "My First Blog Post",
  "body": "This is the content of my blog post...",
  "name": "John Doe",
  "category": "Technology"
}
```

## Configuration

Update the database configuration in `sequelize/config/config.json`:

```json
{
  "development": {
    "username": "your_postgres_username",
    "password": "your_postgres_password", 
    "database": "blog-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

## Testing

Run the test suite:
```bash
npm test
```

The test suite includes:
- User CRUD operations testing
- Post CRUD operations testing  
- Input validation testing
- Error handling verification

## Project Structure

```
blog-api/
├── controllers/
│   ├── userController.js
│   └── postsController.js
├── routes/
│   └── Routes.js
├── sequelize/
│   ├── config/
│   │   └── config.json
│   ├── migrations/
│   │   ├── create-users.js
│   │   ├── create-posts.js
│   │   ├── create-categories.js
│   │   └── create-post-category.js
│   └── models/
│       ├── index.js
│       ├── users.js
│       ├── posts.js
│       ├── categories.js
│       └── postcategory.js
├── test/
│   └── test.js
├── server.js
├── package.json
└── README.md
```

## Features in Detail

### User Management
- Create users with name and email validation
- Retrieve all users or specific user by ID
- Update user information
- Delete users (cascades to related posts)

### Post Management  
- Create posts associated with existing users
- Automatic category creation and assignment
- Support for multiple categories per post
- Full post retrieval with user and category information

### Category System
- Automatic category creation when creating posts
- Many-to-many relationship between posts and categories
- Default "General" category assignment if none specified

### Database Transactions
- Post creation uses transactions to ensure data integrity
- Automatic rollback on errors during post creation process

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content (for deletes)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error