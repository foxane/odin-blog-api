## ENDPOINTS

### `/auth`

| Endpoint    | Method   | Payload               | Auth | Description       |
| ----------- | -------- | --------------------- | ---- | ----------------- |
| `/register` | **POST** | name, email, password | none | Response with jwt |
| `/login`    | **POST** | email, password       | none | Response with jwt |

### `/users`

| Endpoint    | Method     | Payload               | Auth  | Description                        |
| ----------- | ---------- | --------------------- | ----- | ---------------------------------- |
| `/`         | **GET**    |                       | admin | Get all users details              |
| `/<userId>` | **GET**    |                       | none  | Get users details                  |
| `/<userId>` | **PUT**    | name, email, password | user  | Edit user details                  |
| `/<userId>` | **PATCH**  | secret                | user  | Make user author, code is : `babi` |
| `/<userId>` | **DELETE** |                       | admin | Delete user                        |

### `/posts`

| Endpoint   | Method     | Payload                    | Auth   | Description                       |
| ---------- | ---------- | -------------------------- | ------ | --------------------------------- |
| `/`        | **GET**    |                            | none   | Get all published posts           |
| `/`        | **POST**   | title, content             | author | Create new post                   |
| `/:postId` | **GET**    |                            | none   | Get single post, published or not |
| `/:postId` | **PUT**    | title, content             | author | Update post                       |
| `/:postId` | **PATCH**  | publish: ['true', 'false'] | author | Publish post                      |
| `/:postId` | **DELETE** |                            | author | Delete post                       |
