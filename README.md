# Note App

A simple note-taking application with user authentication. Users can create, edit, and delete their own notes. The app also includes a home tab featuring static content and in the dashboard tab dynamic resource (notes) are retrieved.

---

## Features

- **User Authentication**:

- **Notes Management**:

---

## Technologies Used

### Frontend:
- **React**
- **Next.js**
- **Next.js Router**: Used for client-side navigation.
- **TypeScript**
- **Redux**: Used for state management.

### Backend:
- **Node.js**
- **Express.js**
### Database:
- **MySQL**

### Other Tools:
- Docker and Docker Compose

---

## Prerequisites

Before running the app, ensure the following requirements are met:

- **Required Ports**:
  - `3306` (SQL database)
  - `3000` (Frontend)
  - `3001` (Backend)

- **Installed Tools**:
  - Docker
  - Docker Compose

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/chrisamgad/note-app
   cd note-app
   ```

2. Ensure the required ports (`3306`, `3000`, and `3001`) are available on your machine.

3. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

4. Wait for all services to start. Once up, access the app in your browser at:
   - [http://localhost:3000](http://localhost:3000)

---

## How to Use the App

1. After accessing the app in your browser, navigate to the **Create Account** tab to register a new account.
2. Log in with your newly created account credentials.
3. Access the **Dashboard** tab (only available to logged-in users) to manage your notes.
4. Start creating your notes by adding a title and body.
5. Manage your notes by editing or deleting them as needed.
![Screenshot 2024-12-26 041103](https://github.com/user-attachments/assets/dd5d9e74-3f28-4ce6-8e1c-58856a8b791e)
![Screenshot 2024-12-26 041623](https://github.com/user-attachments/assets/e173dfb7-9e6f-4607-a41c-9b4d2488f470)

---
## ERD for DB
![Screenshot 2024-12-25 050753](https://github.com/user-attachments/assets/706a5a21-7a3b-421d-af86-a46d8bbf0dde)
![image](https://github.com/user-attachments/assets/58854053-061b-4e73-a78c-82e8cd120e99)


## API Specifications

### Base URLs
 Note: Cookies-based authentication is used so you need to log in before being able to access the protected endpoints.

- **Backend BASE URL**: `http://localhost:3001`

### User Endpoints

| Endpoint          | Method | Description                             | Request Body                                                                                   | Response                                                                                       |
|-------------------|--------|-----------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `/users/register`       | POST   | Registers a new user              | { <br> `"email": "string",  "password": "string",  "name": "string"` <br> }                          | `201 Created`: `{ "status": "success", "data": { "user": { "id": "number", "name": "string", "email": "string" } } }` |
| `/users/login`          | POST   | Authenticates a user                   | {<br> `"email": "string", "password": "string"` <br>}                                              | `200 OK`: `{ "status": "success", "data": { "user": { "id": "number", "name": "string", "email": "string" } } }` |
| `/users/logout`         | POST   | Logs out the authenticated user                      | None                                                                                           | `201 Created`: `{ "status": "success", "message": "Logout successful" }`                                                               |
| `/users/profile`  | GET    | Retrieves authenticated user's profile | None                                                                                           | `200 OK`: `{ "status": "success", "data": { "user": { "id": "number", "name": "string", "email": "string" } } }` |
| `/users/profile`  | PUT    | Updates authenticated user's profile   | { <br> `"name": "string", "password": "string"` <br>}                         | `200 OK`: `{ "status": "success", "data": { "user": { "id": "number", "name": "string", "email": "string" } } }` |
| `/users/delete`         | DELETE | Deletes authenticated user's account   | None                                                                                           | `200 OK`: `{ "status": "success", "message": "User account deleted successfully" }`                                                                    |

### Note Endpoints

| Endpoint          | Method | Description                             | Request Body                                                                                   | Response                                                                                       |
|-------------------|--------|-----------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `/notes`    | POST   | Creates a new note for the authenticated. user                     | {<br> `"title":"string", "body": "string"` <br>}                                                  | `201 Created`: `{ "status": "success", "data": { "note": { "id": "number", "authorId": "number", "title": "string", "body": "string", "createdAt": "string", "updatedAt": "string" } }, "message": "Note created successfully" }` |
| `/notes`     | GET    | Retrieves notes for the authenticated. user                    | None                                                                                           | `200 OK`: `{ "status": "success", "data": { "notes": [ { "id": "number", "authorId": "number", "title": "string", "body": "string", "createdAt": "string", "updatedAt": "string" } ] } }` |
| `/notes/:noteId` | GET    | Retrieves a specific note for the authenticated user           | None                                                                                           | `200 OK`: `{ "status": "success", "data": { "note": { "id": "number", "authorId": "number", "title": "string", "body": "string", "createdAt": "string", "updatedAt": "string" } } }` |
| `/notes/:noteId` | PUT    | Updates a specific note for the authenticated user             | {<br> `"title": "string", "body": "string"` <br>}                                                | `200 OK`: `{ "status": "success", "data": { "note": { "id": "number", "authorId": "number", "title": "string", "body": "string", "createdAt": "string", "updatedAt": "string" } }, "message": "Note updated successfully" }` |
| `/notes/:noteId` | DELETE | Deletes a specific note for the authenticated user           | None                                                                                           | `200 OK`: `{ "status": "success", "data": {}, "message": "Note deleted successfully" }`                                           |

### Featured Content Endpoint

| Endpoint          | Method | Description                             | Request Body                                                                                   | Response                                                                                       |
|-------------------|--------|-----------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `/featured-content`    | GET   | Retrieves Featured Content                     | None                                                  | `201 Created`: `{ "status": "success", "data": { "featuredContent": [{"id": "number", "title": "string", "content": "string", "createdAt": "string", "updatedAt": "string"}] , "message": "Request successful" }`
