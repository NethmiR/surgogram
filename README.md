# Surgogram Web Application

The Surgogram web application is a full-stack project with two main components:

- **Client**: `surgogram-web-app-client` – Built with Next.js, Tailwind CSS, and TypeScript.
- **Server**: `surgogram-web-app-server` – Built with Express.js, Firebase Authentication, and Supabase for storage.

This repository also includes resources for API testing and documentation.

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Getting Started](#getting-started)
   - [Run Using Docker](#run-using-docker)
   - [Run Without Docker](#run-without-docker)
3. [Testing](#testing)
4. [API Documentation](#api-documentation)
5. [Contributing](#contributing)
6. [License](#license)

---

## Environment Variables

Before running the application, set up the required environment variables for both the client and server.  
Example `.env` files are provided in each folder:

- `surgogram-web-app-client/.env.example`
- `surgogram-web-app-server/.env.example`

### Steps to Configure:

1. Copy the `.env.example` file in each folder and rename it to `.env`:

   ```bash
   cp surgogram-web-app-client/.env.example surgogram-web-app-client/.env
   cp surgogram-web-app-server/.env.example surgogram-web-app-server/.env
Add the necessary values for all the environment variables as per your configuration.
Getting Started
You can run the application using Docker Compose or manually run the client and server separately.

Run Using Docker
Ensure Docker and Docker Compose are installed on your system.

Navigate to the root directory of the repository.

Run the following command:

bash
Copy code
docker-compose up --build
This will build and start both the client and server containers.

The client will be available at http://localhost:3000.
The server will be available at http://localhost:4000 (or the specified port in the .env file).
Run Without Docker
Running the Client
Navigate to the surgogram-web-app-client folder.

Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
The client will be available at http://localhost:3000 (or the port specified in the .env file).

Running the Server
Navigate to the surgogram-web-app-server folder.

Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm run dev
The server will be available at http://localhost:4000 (or the port specified in the .env file).

Testing
API Unit Testing
API unit tests are located in the unitTesting folder within the surgogram-web-app-server directory.

Run the tests using the following command from the surgogram-web-app-server folder:

bash
Copy code
npm test
API Collection and Documentation
The Hoppscotch API collection and API documentation are located in the /test folder within the surgogram-web-app-server directory.

You can import the Hoppscotch collection into your preferred API testing tool for exploration and testing.

Contributing
We welcome contributions to the project! Here's how you can contribute:

Fork the repository: Click the "Fork" button at the top-right corner of this page.

Clone the forked repository:

bash
Copy code
git clone https://github.com/your-username/surgogram-web-app.git
Create a new branch:

bash
Copy code
git checkout -b feature/YourFeatureName
Make your changes: Implement the feature or fix the issue.

Commit your changes:

bash
Copy code
git commit -m "Add: Description of the changes"
Push the changes:

bash
Copy code
git push origin feature/YourFeatureName
Create a pull request: Submit your changes for review.

License
This project is licensed under the MIT License.

Contact
For any questions, issues, or feedback, feel free to open an issue or contact the maintainers.

markdown
Copy code

### Key Details:
1. **Environment Variable Setup**: Includes example `.env` instructions.
2. **Docker Integration**: Provides clear steps for running with Docker.
3. **Manual Setup**: Explains how to run the client and server independently.
4. **Testing and Documentation**: Highlights the API testing folder and Hoppscotch collection.
5. **Contribution Guidelines**: Encourages collaboration with detailed steps.

Let me know if you need further customizations!