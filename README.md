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

### 3. Deploy the backend
Navigate to the backend/ directory and bootstrap your AWS environment
```bash
cd ../backend
cdk bootstrap
```

Deploy the CDK stack
```bash
cdk deploy
```

This step provisions the required AWS resources:
<pre>
• DynamoDB table
• AppSync GraphQL API
• Lambda functions
</pre>

The deployment output will include the AppSync API URL.

Outputs:
<pre>
BackendStack.GraphQLAPIKey = api-key
BackendStack.GraphQLAPIURL = graphql-api-url
BackendStack.StackRegion = graphql-api-stack-region
Stack ARN:
arn:aws:cloudformation:eu-central-1:710271912837:stack/BackendStack/d3d2f920-d181-11ef-9c04-026bd7ce6da3
</pre>

### 4. Configure the Frontend
Navigate to the frontend/ directory
```bash
cd frontend/
```

Create a .env.local file in the frontend/ directory and add the following
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT='the graphql url from the last step output'
NEXT_PUBLIC_GRAPHQL_API_KEY='the graphql api-key from the last step output'
```

Start the development server
```bash
npm run dev
```

## Running the Project

<pre>
1. Ensure the backend is deployed and the frontend is configured.
2. Run the frontend development server (npm run dev) to open the client in your browser.
3. Interact with the AppSync API via the UI, which triggers the Lambda functions and DynamoDB operations.
</pre>

## Useful Commands

### Backend

AWS CDK (Python)
<pre>
  • cdk synth: Synthesize the CloudFormation template.
  • cdk deploy: Deploy the stack to AWS.
  • cdk destroy: Destroy the deployed stack.
</pre>

Lambda Functions

Modify or update Lambda code in backend/lambda/ and re-deploy using cdk deploy.

### Frontend (Next.js)
<pre>
  • npm run dev: Start the development server.
  • npm run build: Build the frontend for production.
  • npm start: Run the production build.
</pre>

## Cleanup

To avoid incurring charges, clean up the resources

### Destroy the CDK stack:
```bash
cd backend
cdk destroy
```

### Remove your cloned repository
```bash
rm -Rf your-repo
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any questions, feel free to reach out:

Email: nazarenodeveloper@gmail.com

GitHub: nazarenodev

## License

This project is licensed under the MIT License. See the LICENSE file for details.