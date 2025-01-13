# Fullstack Project with AWS CDK (Python), AppSync, DynamoDB, Lambda, and Next.js (TypeScript)

This project demonstrates a fullstack application leveraging AWS services such as **AWS CDK (Python)**, **AWS AppSync**, **AWS DynamoDB**, and **AWS Lambda**, with a **React + Next.js** frontend written in **TypeScript**. The backend handles API interactions and data persistence, while the frontend is built to interact with the AppSync GraphQL API.

---

## Features

- **AppSync GraphQL API**: Managed API for seamless data queries and mutations.
- **DynamoDB**: NoSQL database for efficient data storage and retrieval.
- **Lambda Functions**: Serverless compute for business logic.
- **Next.js Frontend**: React-based frontend with TypeScript, offering server-side rendering and static generation.
- **AWS CDK (Python)**: Infrastructure-as-code for provisioning AWS resources.

---

## Prerequisites

1. [Python](https://www.python.org/) (v3.9+)
2. [AWS CLI](https://aws.amazon.com/cli/) configured with your credentials
3. [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-python.html) installed globally
4. [Node.js](https://nodejs.org/) (v16+)
5. A package manager like [npm](https://npmjs.com/), [Yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

---

## Project Structure Overview
<pre>
root
├── backend/            # Backend directory containing AWS CDK and Lambda functions
│   ├── cdk/            # AWS CDK app written in Python
│   ├── lambda/         # AWS Lambda functions
│   ├── requirements.txt # Python dependencies for CDK
├── frontend/           # Next.js app with TypeScript
├── README.md           # This file
</pre>

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nazarenodev/fullstack-challenge.git
cd fullstack-challenge
```

### 2. Install the dependencies

### For the backend
Navigate to the backend/ directory
```bash
cd backend
```

Create and activate a Python virtual environment
```bash
python3 -m venv .env
source .env/bin/activate # On windows: .env\Scripts\activate
```

Install the required Python packages
```bash
pip install -r requirements.txt
```

Install the AWS CDK globally if not already installed
```bash
npm install -g aws-cdk
```

### For the Frontend

Navigate to the frontend/ directory
```bash
cd ../frontend
```

Install the riquired Node.js packages
```bash
npm install
```

