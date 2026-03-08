# Rock-Paper-Scissors (Angular & Firebase)

This is a Rock-Paper-Scissors application built with Angular and Firebase Realtime Database. The application allows players to log in locally with a username, play against a CPU, and compete for a spot on the leaderboard.

## How to run
1. Clone or extract the source code into a directory.
2. Open terminal in the project directory and run `npm install` to install all dependencies needed to run the game.
3. Start the local development server by running `ng serve`.
4. Open your browser to `http://localhost:4200/`.

## Realtime Database Setup
The app is connected to a Firebase Realtime Database. 
Configuration for Firebase is handled through `@angular/fire` and loaded via `app.config.ts`. 

## Database Structure Used
The game stores the highest score of each player using username from the local login session.

The data model structure in the Realtime Database looks like this:

/players
  /<username>
    highScore: number
    lastUpdated: timestamp (ISOString)

Example of a saved player object:

/players
  /erik
    highScore: 12
    lastUpdated: "2026-03-08T13:46:36.000Z"

## Score Rule: Clamp to zero
When the player loses a round, the application deducts 1 point from their `currentScore`. 

I have implemented the "clamp to minimum 0" rule.

## Extra Features
1. Reset Session Score button: Included in the game UI, allowing the user to reset their current session score to 0 without affecting their stored high score.
2. Leaderboard: A dedicated page at `/highscore` that retrieves all players from the database, sorts them by high score (highest to lowest), and displays a simple leaderboard.

Both the `/game` and `/highscore` routes are protected using Angular Route Guard (`AuthGuard`) preventing unauthenticated access.



