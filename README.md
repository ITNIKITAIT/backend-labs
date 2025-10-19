# Backend Labs — NestJS

Simple NestJS backend with a `/healthcheck` endpoint. Includes Docker and docker-compose for local development and deployment.

---

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

[Backend Labs on Render](https://backend-lab-1-hhc4.onrender.com)
