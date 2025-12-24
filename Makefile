.PHONY: help install dev build up down logs clean setup test migrate backend-install frontend-install backend-dev frontend-dev

# Variables
DOCKER_COMPOSE = docker-compose
PYTHON = python3
NODE = node
YARN = yarn

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
NC = \033[0m # No Color

help: ## Show this help message
	@echo "$(GREEN)Available targets:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

setup: ## Initial setup - create .env from .env.example
	@echo "$(GREEN)Setting up project...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(GREEN)Created .env file from .env.example$(NC)"; \
		echo "$(YELLOW)Please edit .env file with your configuration$(NC)"; \
	else \
		echo "$(YELLOW).env file already exists$(NC)"; \
	fi
	@echo "$(GREEN)Setup complete!$(NC)"

install: backend-install frontend-install ## Install all dependencies

backend-install: ## Install backend dependencies
	@echo "$(GREEN)Installing backend dependencies...$(NC)"
	cd backend && $(PYTHON) -m pip install -r requirements.txt

frontend-install: ## Install frontend dependencies
	@echo "$(GREEN)Installing frontend dependencies...$(NC)"
	cd client && $(YARN) install

dev: ## Run development environment (docker-compose)
	@echo "$(GREEN)Starting development environment...$(NC)"
	$(DOCKER_COMPOSE) up --build

dev-detached: ## Run development environment in background
	@echo "$(GREEN)Starting development environment in background...$(NC)"
	$(DOCKER_COMPOSE) up -d --build

backend-dev: ## Run backend in development mode (local)
	@echo "$(GREEN)Starting backend in development mode...$(NC)"
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend-dev: ## Run frontend in development mode (local)
	@echo "$(GREEN)Starting frontend in development mode...$(NC)"
	cd client && $(YARN) dev

build: ## Build all services for production
	@echo "$(GREEN)Building all services...$(NC)"
	$(DOCKER_COMPOSE) build

up: ## Start all services
	@echo "$(GREEN)Starting all services...$(NC)"
	$(DOCKER_COMPOSE) up -d

down: ## Stop all services
	@echo "$(GREEN)Stopping all services...$(NC)"
	$(DOCKER_COMPOSE) down

down-volumes: ## Stop all services and remove volumes
	@echo "$(GREEN)Stopping all services and removing volumes...$(NC)"
	$(DOCKER_COMPOSE) down -v

logs: ## Show logs from all services
	$(DOCKER_COMPOSE) logs -f

logs-backend: ## Show backend logs
	$(DOCKER_COMPOSE) logs -f backend

logs-frontend: ## Show frontend logs
	$(DOCKER_COMPOSE) logs -f frontend

restart: ## Restart all services
	@echo "$(GREEN)Restarting all services...$(NC)"
	$(DOCKER_COMPOSE) restart

restart-backend: ## Restart backend service
	@echo "$(GREEN)Restarting backend...$(NC)"
	$(DOCKER_COMPOSE) restart backend

clean: ## Clean build artifacts and cache
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	cd client && rm -rf .next out node_modules/.cache
	cd backend && find . -type d -name __pycache__ -exec rm -r {} + 2>/dev/null || true
	cd backend && find . -type f -name "*.pyc" -delete
	@echo "$(GREEN)Clean complete!$(NC)"

clean-all: clean ## Clean everything including Docker volumes
	@echo "$(GREEN)Cleaning everything including Docker volumes...$(NC)"
	$(DOCKER_COMPOSE) down -v --remove-orphans
	cd client && rm -rf node_modules
	cd backend && rm -rf *.db *.db-journal
	@echo "$(GREEN)Clean all complete!$(NC)"

test: ## Run all tests
	@echo "$(GREEN)Running tests...$(NC)"
	@echo "$(YELLOW)Backend tests:$(NC)"
	cd backend && $(PYTHON) -m pytest tests/ -v || echo "No tests found"
	@echo "$(YELLOW)Frontend tests:$(NC)"
	cd client && $(YARN) test || echo "No tests found"

test-backend: ## Run backend tests
	@echo "$(GREEN)Running backend tests...$(NC)"
	cd backend && $(PYTHON) -m pytest tests/ -v

test-frontend: ## Run frontend tests
	@echo "$(GREEN)Running frontend tests...$(NC)"
	cd client && $(YARN) test

migrate: ## Run database migrations
	@echo "$(GREEN)Running database migrations...$(NC)"
	cd backend && alembic upgrade head || echo "No migrations found"

migrate-create: ## Create a new migration (usage: make migrate-create MESSAGE="migration message")
	@echo "$(GREEN)Creating new migration...$(NC)"
	cd backend && alembic revision --autogenerate -m "$(MESSAGE)" || echo "Alembic not configured"

shell-backend: ## Open shell in backend container
	$(DOCKER_COMPOSE) exec backend /bin/bash

shell-frontend: ## Open shell in frontend container
	$(DOCKER_COMPOSE) exec frontend /bin/sh

ps: ## Show running containers
	$(DOCKER_COMPOSE) ps

status: ps ## Alias for ps

stop: down ## Alias for down

start: up ## Alias for up

rebuild: ## Rebuild all containers
	@echo "$(GREEN)Rebuilding all containers...$(NC)"
	$(DOCKER_COMPOSE) build --no-cache

rebuild-backend: ## Rebuild backend container
	@echo "$(GREEN)Rebuilding backend container...$(NC)"
	$(DOCKER_COMPOSE) build --no-cache backend

rebuild-frontend: ## Rebuild frontend container
	@echo "$(GREEN)Rebuilding frontend container...$(NC)"
	$(DOCKER_COMPOSE) build --no-cache frontend

