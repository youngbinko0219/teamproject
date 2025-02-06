## Commit Message Conventions

To maintain a clear and structured commit history, follow these commit message prefixes:

[feat]: For adding new features or functionality.

Example: [feat] Implement user login functionality

[fix]: For fixing bugs.

Example: [fix] Resolve issue with incorrect user profile display

[hotfix]: For urgent fixes that need immediate deployment.

Example: [hotfix] Patch security vulnerability in authentication

[design]: For updates or changes to design elements.

Example: [design] Update button styles on the homepage

[refactor]: For code improvements or restructuring without changing functionality.

Example: [refactor] Simplify user service logic

[chore]: For tasks like updating dependencies, setting up CI/CD, or other maintenance tasks.

Example: [chore] Update Next.js to latest version

[docs]: For documentation changes or additions.

Example: [docs] Add API usage examples in README

[test]: For adding or improving test cases.

Example: [test] Add unit tests for user service

[revert]: For reverting previous commits.

Example: [revert] Revert "[feat] Implement user login functionality"

## General Guidelines

Keep it concise and descriptive: Commit messages should clearly explain the change.

Use the imperative mood: Write commit messages as if giving a command.

✅ Good: [feat] Add signup form validation

❌ Bad: [feat] Added signup form validation

Reference issues or tickets (if applicable): Include relevant issue numbers or JIRA tickets.

Example: [fix] Resolve 404 error on login page (#123)

Separate subject and body (optional): Use a blank line to separate the short summary from detailed explanations.

plaintext

Copy code

[fix] Resolve 404 error on login page

The login page was causing a 404 error due to incorrect route configuration.

Updated the route mappings to resolve the issue.

By adhering to these conventions, you'll ensure a clean and meaningful commit history, making it easier for others to understand your project changes.

## Branching and Pull Request Guidelines

## Branching Strategy

Always create new branches from develop.

This ensures that your feature or bugfix starts with the latest development code.

Example:

bash

Copy code

```
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

## Pull Request Process

1. Create a pull request (PR):

   Once your branch is ready, push it to the remote repository and create a pull request targeting the develop branch.

2. Request a code review:

   Assign team members to review your pull request. Ensure your code follows the project's conventions and has appropriate test coverage.

3. Resolve review comments:

   Address all feedback and update your PR as needed.

4. Merge the PR:

   After the review is approved and all checks pass, you can merge your PR into the develop branch.
