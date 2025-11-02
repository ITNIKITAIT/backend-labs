# Backend Labs — NestJS

Develop and test a basic REST API for an expense tracking web application.  
In this lab, data is stored in a **PostgreSQL database** using **ORM (Prisma)**.  
Includes **JWT authentication**, **data validation**, **error handling**, and an **additional feature** according to the lab variant.

---

## Lab 4: Authentication

- User registration and login endpoints
- JWT access and refresh token authentication
- Protected routes (all endpoints require authentication)
- Token refresh mechanism
- Password hashing with bcrypt

---

## Lab 3 Variant

**Group:** IM-31 → 31 mod 3 = 1 → **Variant: Currencies**

### Additional Feature: Currencies

- Each user has a **default currency** (can be updated).
- Each expense record may specify a currency — if not provided, the user’s default currency is used.
- A separate `Currency` entity has been added to manage available currencies.

---

## API Endpoints

### Authentication (Public)

| Method | Endpoint               | Description                              |
| ------ | ---------------------- | ---------------------------------------- |
| POST   | `/auth/register`       | Register a new user                      |
| POST   | `/auth/login`          | Login and receive access/refresh tokens  |
| POST   | `/auth/update-refresh` | Refresh access token using refresh token |

### User (Protected)

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/users`         | Get all users          |
| GET    | `/user/:user_id` | Get a specific user    |
| DELETE | `/user/:user_id` | Delete a specific user |

---

### Category (Protected)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/category/:category_id` | Get a specific category |
| POST   | `/category`              | Create a new category   |
| DELETE | `/category/:category_id` | Delete a category       |

---

### Record (Protected)

| Method | Endpoint             | Description                                               |
| ------ | -------------------- | --------------------------------------------------------- |
| GET    | `/record/:record_id` | Get a specific record                                     |
| POST   | `/record`            | Create a new record                                       |
| GET    | `/record`            | Get records filtered by `user_id`, `category_id`, or both |
| DELETE | `/record/:record_id` | Delete a record                                           |

### Currency (Protected)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/currencies`            | Get all currencies      |
| GET    | `/currency/:currency_id` | Get a specific currency |
| POST   | `/currency`              | Create a new currency   |
| DELETE | `/currency/:currency_id` | Delete a currency       |

**Authentication Required:** Bearer Token in `Authorization` header

## Prerequisites

- Node.js 18+ & npm
- Git
- Docker

---

## Setup

```bash
git clone https://github.com/ITNIKITAIT/backend-labs.git
cd backend-labs
npm install
```

## Run Locally

```bash
# development
npm run dev

# production build
npm run build
```

## Docker

```bash
docker build -t backend-labs .
docker run -p 5000:5000 backend-labs
```

Using docker-compose

```bash
docker-compose up -d --build
docker-compose down
```

---

## Deployment

[Backend Labs on Render](https://backend-lab-4-p4yx.onrender.com)
