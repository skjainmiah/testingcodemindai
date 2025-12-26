#!/bin/bash

# Initialize git repository (if not already initialized)
git init

# Add all files respecting .gitignore
git add .

# Create initial commit
git commit -m "Initial commit: BMI Calculator application"

# Create new repository on GitHub (requires GitHub CLI)
# If you don't have GitHub CLI, create the repo manually on GitHub.com
gh repo create testcodemind --public --description "BMI Calculator application with Flask and Node.js implementations"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/testcodemind.git

# Push to main branch
git branch -M main
git push -u origin main

# Optional: Create and push development branch
git checkout -b develop
git push -u origin develop