## ENDPOINTS

### `/auth`

| Endpoint    | Method   | Payload               | Auth | Description       |
| ----------- | -------- | --------------------- | ---- | ----------------- |
| `/register` | **POST** | name, email, password | none | Response with jwt |
| `/login`    | **POST** | email, password       | none | Response with jwt |
