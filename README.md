# Contributing to Jal-Vision

Thank you for considering contributing to Jal-Vision! We appreciate your help in making this project better. Please follow the guidelines below to ensure a smooth contribution process.

## Getting Started

1. **Fork the repository**: Click the "Fork" button at the top right of this page.
2. **Clone your fork**: Clone your forked repository to your local machine using:
   ```bash
   git clone https://github.com/m-tabish/jal-vision-ui.git
   ```
3. **Run**:

   ```bash
   npm install
   ```

4. **Create a `.env` file**: Create a `.env` file in the root directory of the project and add the necessary environment variables as per the format in .env.example. For example:

   ```plaintext
      VITE_API_KEY =  ""
      VITE_AUTH_DOMAIN =  ""
      VITE_PROJECT_ID =  ""
      VITE_STORAGE_BUCKET =  ""
      VITE_MESSAGING_SENDER_ID =  ""
      VITE_APP_ID =  ""
      VITE_MEASUREMENT_ID =  ""
   ```

5. Run :

   ```bash
   npm run dev
   ```

   ## Creating a Pull Request

   1. **Create a branch**: Create a new branch for your feature or bugfix:
      ```bash
      git checkout -b my-feature-branch
      ```
   2. **Make your changes**: Make the necessary changes in your local repository.
   3. **Commit your changes**: Commit your changes with a descriptive commit message:
      ```bash
      git commit -m "Description of the feature or fix"
      ```
   4. **Push to GitHub**: Push your changes to your forked repository:
      ```bash
      git push origin my-feature-branch
      ```
   5. **Open a Pull Request**: Go to the original repository on GitHub and click the "New Pull Request" button. Select your branch and submit the pull request.

   Your pull request will be reviewed, and you may be asked to make additional changes before it is merged.
