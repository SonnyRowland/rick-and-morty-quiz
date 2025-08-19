# Rick and Morty: The Unofficial Quiz

Rick and Morty: The Unofficial Quiz is a react-native based quiz app that makes use of the rickandmortyapi.com API for data.

## Core Features

- Trivia Game: 10-question Rick and Morty based multiple choice trivia
- Character Browser: View and filter through all Rick and Morty characters

## Installation

### Requirements

To run the app, you will need the following:

- Expo Go installed on your phone
- Node.js and pnpm

### Starting the App

- Clone the repo

```bash
git clone https://github.com/SonnyRowland/react-native-app.git
```

- Install dependencies and run Expo

```bash
pnpm install
pnpm start
```

- Open Expo Go on your phone, and start the app!

## Development

### Folder Structure

- **screens/** - Main app screens (Home, Trivia, Characters, etc.)
- **components/** - Reusable UI components
- **context/** - Contains GameContext that houses all game state variables
- **graphql/** - Apollo Client queries and client
- **utils/** - Helper functions (question generators etc.)
- **hooks/** - Contains useApi hook for fetching data
- **navigation/** - Uses React Navigation for screen management
