# 🚀 Infrastructure Integration System

## 📌 Project Overview

This project implements a containerized infrastructure that integrates independent backend services into a unified, production-ready system.

The system connects:

* Metadata storage service
* File upload and retrieval service
* Object storage layer

All external traffic is routed through a centralized reverse proxy, ensuring clean architecture, security, and scalability.

---

## 🏗️ Architecture

The system follows a microservices-based architecture:

* **Nginx** → Reverse Proxy (entry point)
* **Metadata Service** → Handles structured data (MongoDB)
* **File Service** → Handles file uploads (MinIO)
* **MongoDB** → Database
* **MinIO** → Object storage (S3-compatible)
* **Docker Compose** → Orchestration

### Flow:

Client → Nginx → Backend Services → Storage Layer

---

## 🔀 Routing

All traffic is routed through Nginx:

| Route              | Destination      |
| ------------------ | ---------------- |
| `/api/health`      | Health Check     |
| `/api/metadata`    | Metadata Service |
| `/api/upload-file` | File Service     |
| `/api/get-file`    | File Service     |
| `/storage/*`       | Object Storage   |

---

## 🐳 Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Start System

```bash
docker compose up --build
```

### 3. Access Services

* API Base: `http://localhost`
* MinIO: `http://localhost:9000`

---

## 🧪 API Endpoints

### ✅ Health Check

```http
GET /api/health
```

Response:

```json
{ "status": "ok" }
```

---

### 📦 Metadata Service

#### Create Metadata

```http
POST /api/metadata
```

Body:

```json
{
  "title": "example",
  "description": "demo",
  "filePath": "file123"
}
```

#### Get Metadata

```http
GET /api/metadata
```

---

### 📁 File Service

#### Upload File

```http
POST /api/upload-file
```

* Use form-data
* Key: `file`

#### Get File

```http
GET /api/get-file?name=<filename>
```

---

## ⚙️ Environment Variables

Create a `.env` file using:

```bash
cp .env.example .env
```

Example variables:

```
MONGO_URI=mongodb://mongo:27017/test
MINIO_USER=admin
MINIO_PASS=password
```

---

## 🧠 Design Decisions

* **Nginx** used for centralized routing and traffic control
* **MongoDB** chosen for flexible schema handling
* **MinIO** provides S3-compatible object storage
* Services are **loosely coupled** for scalability
* Docker ensures **reproducibility and portability**

---

## ⚖️ Trade-offs

* No caching layer included to keep system lightweight
* Minimal services used to reduce CPU and memory usage
* Focused on reliability over feature complexity

---

## 🔒 System Constraints Handling

* All backend services are containerized
* Reverse proxy ensures no direct service exposure
* Services communicate only when required
* Designed to be reproducible from scratch

---

## 🚀 How to Test

1. Start the system:

```bash
docker compose up --build
```

2. Use Postman or curl to test endpoints:

* `/api/health`
* `/api/metadata`
* `/api/upload-file`
* `/api/get-file`

---

## 📌 Assumptions

* Docker is installed and configured
* Ports 80, 3001, 3002, 9000 are available
* No authentication layer required (not specified)

---

## 📈 Future Improvements

* Add Redis caching layer
* Implement authentication & authorization
* Add logging and monitoring (Prometheus/Grafana)
* Kubernetes deployment support

---

## 👨‍💻 Author

Hackathon Submission Project
