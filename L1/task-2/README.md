# Products API

## Features

- Create products
- Retrieve all products
- Retrieve a product by ID
- Update products
- Delete products
- Request validation using Zod
- Centralized error handling
- Environment-based configuration
- RESTful API design

## Tech Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | Web framework             |
| Zod        | Request validation        |
| Dotenv     | Environment configuration |
| Nodemon    | Development server        |

## Project Structure

```text
task-2/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── repositories/
│   │   └── product.repository.js
│   ├── routes/
│   │   └── product.route.js
│   ├── schemas/
│   │   └── product.schema.js
│   ├── services/
│   │   └── product.service.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Layer Responsibilities

- **Routes** — Defines API endpoints and request flow.
- **Middlewares** — Handles request validation and application errors.
- **Controllers** — Handles HTTP requests and responses.
- **Services** — Contains application/business logic.
- **Repositories** — Handles product data access.
- **Schemas** — Defines and validates request data.
- **Config** — Manages environment configuration.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

Clone the repository and navigate to the task directory:

```bash
git clone https://github.com/asepjamaludinn/products
cd products/L1/task-2
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development
```

### Run Development Server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### Run Production Server

```bash
npm start
```

## API Endpoints

| Method   | Endpoint            | Description       |
| -------- | ------------------- | ----------------- |
| `GET`    | `/api/products`     | Get all products  |
| `GET`    | `/api/products/:id` | Get product by ID |
| `POST`   | `/api/products`     | Create a product  |
| `PUT`    | `/api/products/:id` | Update a product  |
| `DELETE` | `/api/products/:id` | Delete a product  |

## API Usage

### Get All Products

```http
GET /api/products
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Mouse",
      "price": 150000,
      "stock": 10
    },
    {
      "id": 2,
      "name": "Mechanical Keyboard",
      "price": 750000,
      "stock": 5
    }
  ]
}
```

### Get Product by ID

```http
GET /api/products/1
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Mouse",
    "price": 150000,
    "stock": 10
  }
}
```

### Create Product

```http
POST /api/products
Content-Type: application/json
```

Request body:

```json
{
  "name": "USB WiFi Adapter",
  "price": 125000,
  "stock": 20
}
```

Response:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 3,
    "name": "USB WiFi Adapter",
    "price": 125000,
    "stock": 20
  }
}
```

### Update Product

```http
PUT /api/products/3
Content-Type: application/json
```

Request body:

```json
{
  "name": "USB WiFi Adapter Pro",
  "price": 175000,
  "stock": 15
}
```

Response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 3,
    "name": "USB WiFi Adapter Pro",
    "price": 175000,
    "stock": 15
  }
}
```

### Delete Product

```http
DELETE /api/products/3
```

Response:

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": 3,
    "name": "USB WiFi Adapter Pro",
    "price": 175000,
    "stock": 15
  }
}
```

## Validation

Request validation is handled using **Zod**.

Example of an invalid request:

```json
{
  "name": "",
  "price": -100,
  "stock": -5
}
```

Response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "price",
      "message": "Price must be greater than 0"
    },
    {
      "field": "stock",
      "message": "Stock cannot be negative"
    }
  ]
}
```

## Error Handling

The API uses centralized error handling with consistent response formatting.

### Product Not Found

```json
{
  "success": false,
  "message": "Product not found"
}
```

### Route Not Found

```json
{
  "success": false,
  "message": "Route not found"
}
```

## Development

Run the development server with Nodemon:

```bash
npm run dev
```
