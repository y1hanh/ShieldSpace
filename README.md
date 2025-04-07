# Shield Space

## Developer Guide

### Setting Up the Project for the First Time

To install dependencies and start the development server, run:

```sh
cd nobullying
bun install
bun run dev
```

### Our Codebase Structure

We are using MUI as our UI library for consistency and convenience.  
Please follow the structure below:

```
nobullying
│── src
│   ├── component
│   ├── context
│   ├── hooks
│   ├── page
│── App.tsx
│── main.tsx
│── routes.ts
│── vite-env.d.ts
```

### Developing a New Feature

Before starting a new feature, ensure your branch is up to date:

```sh
git checkout main
git pull
git checkout -b [your-feature-branch]
```

### Completing Development

Before submitting a pull request, merge the latest changes from the `main` branch:

```sh
git checkout [your-feature-branch]
git pull
git merge main
```

### Submitting Changes

1. Open a pull request on GitHub.
2. The branch will be automatically merged upon approval.

## Thank you for contribuding!
