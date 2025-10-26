# Backend Labs — NestJS

Develop and test a basic REST API for an expense tracking web application.  
In this lab, data is stored in a **PostgreSQL database** using **ORM (Prisma)**.  
Includes **data validation**, **error handling**, and an **additional feature** according to the lab variant.

---

## Lab 3 Variant

**Group:** IM-31 → 31 mod 3 = 1 → **Variant: Currencies**

### Additional Feature: Currencies

- Each user has a **default currency** (can be updated).
- Each expense record may specify a currency — if not provided, the user’s default currency is used.
- A separate `Currency` entity has been added to manage available currencies.

---

### User

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/user/:user_id` | Get a specific user    |
| DELETE | `/user/:user_id` | Delete a specific user |
| POST   | `/user`          | Create a new user      |
| GET    | `/users`         | Get all users          |

### Category

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | `/category` | Get all categories    |
| POST   | `/category` | Create a new category |
| DELETE | `/category` | Delete a category     |

### Record

| Method | Endpoint             | Description                                               |
| ------ | -------------------- | --------------------------------------------------------- |
| GET    | `/record/:record_id` | Get a specific record                                     |
| DELETE | `/record/:record_id` | Delete a record                                           |
| POST   | `/record`            | Create a new record                                       |
| GET    | `/record`            | Get records filtered by `user_id`, `category_id`, or both |

### Category

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/currency:currency_id` | Get all categories    |
| GET    | `/currencies`           | Get all users         |
| POST   | `/currencyd`            | Create a new category |
| DELETE | `/currency`             | Delete a category     |

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

[Backend Labs on Render](https://backend-lab-2-h00x.onrender.com)
