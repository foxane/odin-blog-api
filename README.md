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
