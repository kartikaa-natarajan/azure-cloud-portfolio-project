<<<<<<< HEAD
# Portfolio_SaiSiddartha.
=======
# Azure Cloud Project

## 1. Project Overview

The Azure Cloud Project is a collaborative cloud computing and deployment project that brings together application development, cloud infrastructure provisioning, containerization, CI/CD automation, DNS configuration and portfolio integration.

The project uses a centralized GitHub repository to manage source code, coordinate contributions from multiple teams and maintain project documentation.

## 2. Project Objectives

- Develop and deploy applications using Microsoft Azure.
- Provision and manage cloud infrastructure.
- Configure DNS for application accessibility.
- Containerize applications using Docker.
- Implement CI/CD automation for application build and deployment.
- Maintain a centralized repository for collaborative development.
- Integrate individual student portfolios into a common repository.

## 3. Overall Project Components

### 3.1 DNS Configuration

This component covers DNS configuration and domain name resolution for accessing the deployed application.

**Implementation details:** To be documented using the DNS team's actual configuration.

### 3.2 Virtual Machine Provisioning

This component covers the creation and configuration of virtual machines required for hosting or supporting project workloads.

**Implementation details:** To be documented using the infrastructure team's actual implementation.

### 3.3 Application Development

This component covers the development and organization of the application's source code and related functionality.

**Implementation details:** Refer to the application development team's codebase and documentation.

### 3.4 Docker Containerization

This component covers packaging the application and its dependencies into Docker images for consistent deployment.

**Implementation details:**
- Every student portfolio folder includes an isolated multi-stage `Dockerfile` and `.dockerignore`.
- Centralized Nginx reverse proxy routing requests via subdomains (`http://<student-name>.localhost:8080/`) with embedded DNS failover.
- Root [docker-compose.yml](file:///d:/Govind/azure-cloud-portfolio-project/docker-compose.yml) for local and Azure VM orchestration.
- Automated provisioning script ([scripts/generate_docker_setup.py](file:///d:/Govind/azure-cloud-portfolio-project/scripts/generate_docker_setup.py)) for new portfolio onboarding.
- Detailed architecture and usage documented in [CONTAINER_AND_CI_GUIDE.md](file:///d:/Govind/azure-cloud-portfolio-project/CONTAINER_AND_CI_GUIDE.md).

### 3.5 CI/CD Pipeline

This component covers the automation of build, validation, testing and deployment activities using the project's configured CI/CD workflows.

**Implementation details:**
- Centralized GitHub Actions workflow at [.github/workflows/docker-ci.yml](file:///d:/Govind/azure-cloud-portfolio-project/.github/workflows/docker-ci.yml).
- **Selective Matrix Building:** Detects changed portfolios using `git diff` and only builds containers for modified folders.
- **PR Gating:** Validates Docker image builds without publishing on Pull Requests.
- **Automated Publishing:** Automatically tags and pushes production container images to GitHub Container Registry (`ghcr.io`) upon merging to `main`.

### 3.6 GitHub Repository and Portfolio Management

This component manages the centralized repository and integration of individual student portfolios.

Activities include:
- Centralized repository creation and configuration.
- Individual branch-based contributions.
- Pull Request submission and review.
- Repository access and permission management.
- Branch protection and approval rules.
- Integration of approved portfolios into the main branch.

## 4. Repository Structure

The central repository contains:

- Individual student portfolio folders.
- Main project source code and related files, where integrated.
- CI/CD workflow configurations.
- Project-level documentation.
- Infrastructure and deployment-related files, where integrated.

## 5. GitHub Collaboration Workflow

The portfolio contribution process follows:

1. Clone the central repository.
2. Create an individual feature branch.
3. Add the portfolio in a separate folder.
4. Commit the changes.
5. Push the branch to GitHub.
6. Create a Pull Request targeting main.
7. Review and approve the submitted changes.
8. Merge approved contributions into main.

## 6. Technology Stack

The project technology stack includes the tools and platforms used by the participating teams.

- Microsoft Azure
- Git
- GitHub
- Docker
- CI/CD and GitHub Actions
- DNS services
- Virtual Machines

Additional technologies should be included based on the actual implementation.

## 7. Project Status

The repository currently contains the individual portfolio submissions integrated into the main branch.

The status of the application codebase, DNS configuration, virtual machine provisioning, Docker image creation and CI/CD integration should be updated based on the respective teams' verified deliverables.

## 8. Future Scope

- Complete integration of all project components.
- Connect application deployment with the containerization workflow.
- Verify DNS-based application accessibility.
- Integrate infrastructure provisioning and deployment automation.
- Improve project-level documentation and deployment procedures.

## 9. Team Contributions

This project involves multiple teams working on different components, including infrastructure, application development, containerization, automation and GitHub repository management.

Each team's specific contribution should be documented according to its implemented deliverables.

## 10. Conclusion

The centralized repository provides a common platform for collaborative development, source-code management and portfolio integration. It establishes an organized foundation for bringing together the different components of the Azure Cloud Project.
>>>>>>> central/main
