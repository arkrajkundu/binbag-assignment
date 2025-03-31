# User Profile Management API

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/arkrajkundu/binbag-assignment
   cd binbag-assignment
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret_key>
   ```

4. Start the server using `nodemon`:
   ```bash
   npm run dev
   ```

5. Use Postman or any HTTP client to test the API endpoints.

## Endpoints

### Register User
- **POST** `/api/users/register`
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": "123 Main St",
    "bio": "A passionate developer",
    "profilePicture": "https://example.com/johns-pic.jpg"
  }
  ```
  - **profilePicture**: Optional, upload the profile picture image file via `form-data` (Postman).

### Login User
- **POST** `/api/users/login`
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Get Profile
- **GET** `/api/users/profile`
- Authorization: Bearer token

### Update Profile
- **PUT** `/api/users/profile`
- Authorization: Bearer token
- Request body:
  ```json
  {
    "name": "John Doe Updated",
    "bio": "An experienced developer", 
    "profilePicture": "https://example.com/johns-updated-pic.jpg"
  }
  ```
  - **bio** (optional): A short description of the user.
  - **profilePicture** (optional): Upload the new profile picture image file via `form-data` (Postman).

---

## Sample `.env` File

```
MONGO_URI=mongodb://localhost:27017/userProfilesDB
JWT_SECRET=your_jwt_secret_key
```

---

## Notes

- **Profile Picture Upload**: The profile picture can be uploaded as an image file via `form-data` (Postman). The file is stored in the `uploads/profile_pictures` folder and its path is saved in the database.
- **Image Format**: Only `jpeg`, `jpg`, `png`, and `gif` image formats are accepted, with a maximum size limit of 5 MB.