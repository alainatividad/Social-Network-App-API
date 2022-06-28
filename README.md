# E-commnerce Back End

## Description

This application is an Express.js API that interacts with MongoDB that serves as a back end for an social networking site where users can share their thoughts, react to friends’ thoughts, and create a friend list. The application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

### Database Models

The database contains the following models:

**User**:

- `username`

  - String
  - Unique
  - Required
  - Trimmed

- `email`

  - String
  - Required
  - Unique
  - Must match a valid email address (look into Mongoose's matching validation)

- `thoughts`

  - Array of `_id` values referencing the `Thought` model

- `friends`
  - Array of `_id` values referencing the `User` model (self-reference)

---

**Thought**:

- `thoughtText`

  - String
  - Required
  - Must be between 1 and 280 characters

- `createdAt`

  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

- `username` (The user that created this thought)

  - String
  - Required

- `reactions` (These are like replies)
  - Array of nested documents created with the `reactionSchema`

---

**Reaction** (SCHEMA ONLY)

- `reactionId`

  - Use Mongoose's ObjectId data type
  - Default value is set to a new ObjectId

- `reactionBody`

  - String
  - Required
  - 280 character maximum

- `username`

  - String
  - Required

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

## API Routes

**`/api/users`**

- `GET` all users

- `GET` a single user by its `_id` and populated thought and friend data

- `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

- `PUT` to update a user by its `_id`

- `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

- `POST` to add a new friend to a user's friend list

- `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

- `GET` to get all thoughts

- `GET` to get a single thought by its `_id`

- `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

- `PUT` to update a thought by its `_id`

- `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

- `POST` to create a reaction stored in a single thought's `reactions` array field

- `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Demonstration of the Application

The following videos show the web application's functionality:

### Starting of the Application's Server and Testing of all User Routes


https://user-images.githubusercontent.com/99376802/176184712-46c93866-e4d7-4156-9f85-bf3f3dccb0af.mp4


### Testing of all Thoughts Routes


https://user-images.githubusercontent.com/99376802/176184729-d0c14491-431f-44e3-96c4-a34f4593f7c7.mp4


### Testing of all Friends and Reactions Routes


https://user-images.githubusercontent.com/99376802/176184737-610cfc13-15dd-461c-ab0c-3fc0950f591c.mp4


## Installation

Make sure to have MongoDB installed on your machine before using this application.

After forking the project, run the code below to install the modules needed to run this program:

```
npm install
```

To test and seed the application, open Insomnia and use the sample JSON data above to format the users and thoughts data.

## Usage

To run the program, run the code below:

```
npm start
```
