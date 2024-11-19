TODO :

- Create post controller

## Endpoints

### Auth

- #### `/auth/login`

  - **POST**  
    Return JWT. Add this on your Authorization header with Bearer schema.

    ```json
    // Payload body
    {
      "email": "Email",
      "password": "Password"
    }

    // Response
    {
      "token": "JsonWebToken"
    }
    ```

- #### `/auth/register`

  - **POST**  
     Create new local user.
    ```json
    {
      "fullName": "Text",
      "email": "Email",
      "password": "Password",
      // For additional verification if user decided to be sneaky
      "confirmPassword": "Password"
    }
    ```

### Users

- #### `/users`

  - **GET**  
    Get all users
    ```json
    [
      {
        "id": "unique id string",
        "fullName": "full name",
        "createDate": "DateTime",
        "postCount": 0,
        "commentCount": 0
      }
    ]
    ```

- #### `/users/{userId}`

  - **GET**  
    Get user details. return
    ```json
    {
      "id": "unique id string",
      "fullName": "full name",
      "createDate": "DateTime",
      "postCount": 0,
      "commentCount": 0
    }
    ```
  - **PUT** _(User JWT needed)_  
    Edit user details. Same payload as `POST /users`.
  - **DELETE** _(Admin JWT needed)_  
    Delete user. Their published post would have `null` as user
  - **PATCH** _(Admin JWT needed)_  
    Change user role
    ```json
    {
      "role": "ADMIN" // Available roles: USER, ADMIN
    }
    ```

- #### `/users/{userId}/posts`

  - **GET**  
    Get all published posts by user.

- #### `/users/{userId}/comments`
  - **GET**  
    Get all comments from user.

### Posts

- #### `/posts`

  - **GET**  
    Get all published posts.
  - **POST** _(User JWT needed)_  
    Create new post.

    ```json
    {
      "title": "Text",
      "content": "Json" // Quill delta
    }
    ```

- #### `/posts/{postId}`

  - **GET**  
    Get single published post.
  - **PUT** _(User JWT needed)_  
    Edit post. Same payload as `POST /posts`.
  - **DELETE**  
    Delete post.

- #### `/posts/{postId}/publish`

  - **PATCH** _(User JWT needed)_  
    Change publish status.
    ```json
    {
      "publish": true
    }
    ```

- #### `/posts/{postId}/comments`
  - **GET**  
    Get all comments on this post.
