# Assessment Submission: Front-End Cloud Book Writer Platform

## Overview

This React.js assessment aimed at creating a front-end platform for book creation, editing, and collaboration was an
engaging challenge. The application features unlimited sections and subsections, user authentication, permissions,
roles, and optional bonuses such as writing test cases, caching results, and maintaining a consistent coding style.

## Approach

### Tech Stack

- **React.js:** Building a fast and responsive user interface with React.js.
- **Tailwind CSS:** Ensuring a clean and responsive design with the help of Tailwind CSS.
- **Authentication:** Employing the `react-auth-kit` library for seamless user authentication and authorization.
- **Data Fetching:** Utilizing `usehook-ts` for fetching data with built-in cache support.
- **Form Management:** Integrating Formik for effective form handling.
- **Linting:** Following `TypeScript Eslint Standards` for maintaining a consistent and clean codebase.

### Project Setup

1. **NX's Standalone React Template:** Started with a clean and efficient project structure.
2. **Backend Setup:** Created a dummy backend using `json-server` to simulate authentication and authorization.

## How to Run the Project Locally

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/saqibakajack/syllaby-assessment.git
   ```
2. **Navigate to the Backenc Directory:**
   ```bash
   cd syllaby-assessment/backend
   ```
3. **Install Dependencies:**
   ```bash
   yarn install
   ```
4. **Start the Backend Server:**
   ```bash
    yarn run start
    ```
5. **Navigate to the Frontend Directory:**
   ```bash
   cd syllaby-assessment/frontend
   ```
6. **Install Dependencies:**
   ```bash
   yarn install
   ```
7. **Start the Frontend App:**
   ```bash
   yarn run start
   ```
   
The backend server will be running on port 8080 and the frontend app will be running on port 4200.


# Implementation

## User Workflow

1. **Sign-Up:** Users can sign up at `http://localhost:4200/signup`.
2. **Dashboard:** Upon successful signup, users are redirected to the dashboard with options for `Books`, `Shared books`, and `Profile`.
3. **Book Creation:** Books can be created at `http://localhost:4200/books/create`, where users can add sections and subsections for content.
4. **Permissions:** Authors have the ability to create and edit sections/subsections, while collaborators can edit them. Authors can grant or revoke access to specific collaborators.

## File Structure

- **`app.tsx`:** Handles the routing setup.
- **`src/pages`:** Contains all the pages of the application.
- **`src/components`:** Organizes reusable components, following the `KISS` and `YAGNI` design principles.

## Testing

- **Unit Testing:** Planned to use Vitest but could not be implemented due to time constraints.
- **E2E Testing:** Planned to use Playwright but could not be implemented due to time constraints.

## Notes

- **Time Constraints:** I was busy with my job and could only work on this assessment for a single day, impacting the testing phase.