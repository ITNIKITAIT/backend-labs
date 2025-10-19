# Backend Labs — NestJS

Develop and test a basic REST API for an expense tracking web application. In this lab, all data is stored **in memory** — no database is used.

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
