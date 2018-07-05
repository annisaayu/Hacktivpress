# Hacktivpress
Final Live code Phase 2


# Link Hacktivpress
Demo Blog Hacktivpress
Access Website link : `hacktivpress.annisaayu.tech`

## REST API

List of user routes:

| Route             | HTTP    | Description                          |
| :---------------- | :------ | :----------------------------------- |
| /users            | GET     | Get all users                        |
| /users/login      | GET     | Login user                           |
| /users/register   | GET     | Register new user                    |

List of article routes:

| Route                    | HTTP    | Description                          |
| :-------------           | :------ | :----------------------------------- |
| /articles                | GET     | Get all articles                     |
| /articles/:id            | GET     | Get single article                   |
| /articles/:field/:value  | GET     | Get article by category/author       |
| /articles                | POST    | Create a article                     |
| /articles/:id            | DELETE  | Delete a article                     |
| /articles/:id            | PUT     | Update a article with new info       |

## Usage
With only npm:

Client:

```
> npm install
> npm run serve
```

Server:

```
> npm install
> npm start
```

Access api via ` https://hacktivpress-server.annisaayu.tech`