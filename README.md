## ENDPOINTS

### `/auth`

| Endpoint    | Method   | Payload               | Auth | Description       |
| ----------- | -------- | --------------------- | ---- | ----------------- |
| `/register` | **POST** | name, email, password |      | Response with jwt |
| `/login`    | **POST** | email, password       |      | Response with jwt |

### `/users`

| Endpoint             | Method     | Payload               | Auth       | Description                        |
| -------------------- | ---------- | --------------------- | ---------- | ---------------------------------- |
| `/`                  | **GET**    |                       | admin      | Get all users details              |
| `/:userId`           | **GET**    |                       |            | Get users details                  |
| `/:userId`           | **PUT**    | name, email, password | user       | Edit user details                  |
| `/:userId`           | **PATCH**  | secret                | user       | Make user author, code is : `babi` |
| `/:userId`           | **DELETE** |                       | admin      | Delete user                        |
| `/:userId/posts`     | **GET**    |                       |            | Get all user's published post      |
| `/:userId/posts/all` | **GET**    |                       | user/admin | All user's postPublished or not    |

### `/posts`

| Endpoint            | Method     | Payload                    | Auth   | Description                       |
| ------------------- | ---------- | -------------------------- | ------ | --------------------------------- |
| `/`                 | **GET**    |                            |        | Get all published posts           |
| `/`                 | **POST**   | title, content             | author | Create new post                   |
| `/:postId`          | **GET**    |                            |        | Get single post, published or not |
| `/:postId`          | **PUT**    | title, content             | author | Update post                       |
| `/:postId`          | **PATCH**  | publish: ['true', 'false'] | author | Publish post                      |
| `/:postId`          | **DELETE** |                            | author | Delete post                       |
| `/:postId/comments` | **GET**    |                            |        | Get all comment on this post      |

### `/comments`

| Endpoint      | Method     | Payload | Auth  | Description                |
| ------------- | ---------- | ------- | ----- | -------------------------- |
| `/`           | **GET**    |         | admin | Get all comments ever made |
| `/`           | **POST**   | content | user  | Set postId url to create   |
| `/:commentId` | **GET**    |         |       |                            |
| `/:commentId` | **PUT**    | content | user  | Edit comment               |
| `/:commentId` | **DELETE** |         | user  | Delete                     |

### `/categories`

| Endpoint       | Method     | Payload | Auth   | Description           |
| -------------- | ---------- | ------- | ------ | --------------------- |
| `/`            | **GET**    |         |        | Get all categories    |
| `/`            | **POST**   | name    | author | Create new categories |
| `/:categoryId` | **GET**    |         |        | Get single category   |
| `/:categoryId` | **PUT**    | name    | author | Update category       |
| `/:categoryId` | **DELETE** |         | author | Delete category       |
