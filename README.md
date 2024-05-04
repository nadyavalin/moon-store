# Welcome to our eCommerce application!

## This project was developed as a final team task while studying in RSSchool.

### Project goals:

- learn how to work in a team, using Scrum or/and Kanban methodologies
- learn how to work with backend (CommerceTools acts as a backend)
- learn how to create an application from scratch

### Technology Stack:

- SPA
- REST API
- TypeScript
- ESLint
- Prettier
- Husky
- Jest
- Webpack

### How to run project locally:

1. run `git clone https://github.com/nadyavalin/moon-store.git`
2. go to **moon-store folder**
3. run `npm install` for installing necessary node modules
4. run `npm run prepare` for placing Husky into repository
5. run `npm run start` for building project in develop mode or `npm run build` for building project in production mode
6. Go to **dist** folder and run **index.html** using Live Server

### Available scripts:

- `npm run start` builds project with Webpack in develop mode
- `npm run build` builds project with Webpack in production mode
- `npm run format` formats all files with Prettier
- `npm run ci:format` checks if files are formatted
- `npm run lint` checks ESLint errors
- `npm run lint:fix` fixes ESLint errors that can be fixed automatically
- `npm run prepare` run once for the Husky scripts to be placed in the repository
- `npm run test` prevents tests from printing messages to the console
- `npm run test:ci` runs tests in the CI scope with the specified reference generators
- `npm run test:watch` monitors changes in files and reruns tests associated with changed files
- `npm run test:e2e` runs all the tests
- `npm run coverage` specifies that test coverage information should be collected and displayed

## Enjoy our online-store!
