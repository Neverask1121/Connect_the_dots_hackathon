# 🧠 Engineering Justification Report

## 📌 Overview

This project focuses on integrating independent backend services into a cohesive, production-ready system. The design prioritizes modularity, scalability, and efficient resource utilization while ensuring simplicity and reproducibility.

---

## 🏗️ Architecture Design

The system follows a microservices-based architecture with a centralized reverse proxy.

### Key Components:

* Reverse Proxy (Nginx)
* Metadata Service (Node.js + MongoDB)
* File Service (Node.js + MinIO)
* Database (MongoDB)
* Object Storage (MinIO)
* Container Orchestration (Docker Compose)

### Design Principles:

* Loose coupling between services
* Clear separation of concerns
* Centralized traffic management
* Minimal external exposure

---

## 🌐 Why Nginx?

Nginx was selected as the reverse proxy due to:

* High performance and low resource consumption
* Simple and reliable configuration
* Strong support for routing and load balancing
* Industry-standard usage in production systems

It ensures that all incoming traffic is routed through a single entry point, improving security and maintainability.

---

## 🗄️ Why MongoDB?

MongoDB was chosen for metadata storage because:

* Schema flexibility allows easy handling of dynamic data
* Fast read/write performance
* Simple integration with Node.js (Mongoose)
* Suitable for lightweight microservices

Since metadata structure is not strictly relational, MongoDB provides better adaptability compared to SQL databases.

---

## 📁 Why MinIO?

MinIO was selected as the object storage solution because:

* Fully S3-compatible API
* Lightweight and easy to deploy in containers
* Ideal for local development and testing
* High performance for file storage and retrieval

It allows separation of file storage from application logic, which improves scalability.

---

## 🔗 Service Communication

* All external traffic flows through Nginx (reverse proxy)
* Internal services communicate via Docker network
* No direct external exposure of backend services
* Communication is minimal and purpose-driven:

  * Metadata Service ↔ MongoDB
  * File Service ↔ MinIO

This reduces coupling and improves security.

---

## 🔒 Routing Strategy

* `/api/*` routes are handled by backend services
* `/api/metadata` → Metadata Service
* `/api/upload-file` and `/api/get-file` → File Service
* `/api/health` → Health check via proxy

Centralized routing ensures:

* Better control over traffic
* Easier debugging
* Clean API structure

---

## ⚖️ Trade-offs

* No caching layer (e.g., Redis) included to reduce complexity
* No authentication system implemented (not required by problem)
* Minimal services used to maintain simplicity and reliability

The focus was on correctness and integration rather than feature expansion.

---

## 💰 Cost & Resource Optimization

* Used minimal number of containers
* Lightweight services (Node.js, Nginx, MinIO)
* Avoided unnecessary tools like Kafka or Redis
* Efficient use of Docker networking instead of external services

This ensures the system can run on low-resource environments.

---

## 🔁 Reproducibility

* Fully containerized setup using Docker Compose
* No manual configuration required
* Environment variables documented in `.env.example`
* System can be started with a single command:

```bash
docker compose up --build
```

---

## 🚀 Future Improvements

* Add Redis caching for performance optimization
* Implement authentication and authorization
* Add monitoring (Prometheus + Grafana)
* Deploy using Kubernetes for scalability
* Add CI/CD pipeline for automated deployment

---

## 🧠 Conclusion

The system demonstrates strong infrastructure design by integrating multiple services into a unified architecture. It balances simplicity, performance, and scalability while adhering to the constraints of the problem.

The design ensures that the system is:

* Reliable
* Maintainable
* Efficient
* Easily reproducible
