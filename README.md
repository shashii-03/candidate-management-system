
# Candidate Management System

  

This project is a Candidate Management System built with React. It features Google OAuth login, allows adding and managing candidates, and includes multi-step forms for candidate details.

  

## Table of Contents

  

- [Installation](#installation)

- [Usage](#usage)

- [Features](#features)

- [Tests](#tests)

- [Git Integration](#git-integration)

- [Contributing](#contributing)

- [License](#license)

  

## Installation

  

1.  **Clone the repository**:

```bash

git clone https://github.com/your-username/candidate-management-system.git

cd candidate-management-system

```

  

2.  **Install dependencies**:

```bash

npm install

```

  

3.  **Create a `.env` file** and add your Google OAuth client ID:

```env

REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

```

  

## Usage

  

1.  **Start the development server**:

```bash

npm start

```

  

2. Open your browser and navigate to `http://localhost:3000`.

  

## Features

  

### Google OAuth Login

  

- Users can log in using their Google account.

- Redirects to the `/candidate` page upon successful login.

  

### Candidate Management

  

- View a list of candidates.

- Add new candidates using a multi-step form.

- View detailed information of a candidate.

- Edit candidate details using a multi-step form.

- Delete a candidate.

  

### Multi-Step Forms

  

- Step 1: Personal Details (Profile picture, Name, Email, Gender, Hobbies)

- Step 2: Education (School/College/Institute, Year of graduation)

- Step 3: Skills (Skill name, Experience in months)

- Step 4: Experience (Company name, Project name, Role, Duration range)

  

## Tests

  

### Running Unit Tests

  

- To run the unit tests, use the following command:

```bash

npm test

```

  

- Unit tests are written using Jest and React Testing Library.

  

### Test Coverage

  

- Ensure the test coverage is adequate for all components and functionalities.

  

## Git Integration

  

1.  **Initialize a Git repository** (if not already initialized):

```bash

git init

```

  

2.  **Add files to Git**:

```bash

git add .

```

  

3.  **Commit your changes**:

```bash

git commit -m "Initial commit with project setup"

```

  

4.  **Connect to remote repository**:

```bash

git remote add origin https://github.com/your-username/candidate-management-system.git

```

  

5.  **Push your changes**:

```bash

git push -u origin main

```

  

## Contributing

  

1.  **Fork the repository**.

  

2.  **Create a new branch**:

```bash

git checkout -b feature-branch

```

  

3.  **Make your changes**.

  

4.  **Commit your changes**:

```bash

git commit -m "Add new feature"

```

  

5.  **Push to the branch**:

```bash

git push origin feature-branch

```

  



  

## License

  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
