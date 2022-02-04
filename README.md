# <p>Backend For African Marketplace 01.</P>

## <p>Backend Deploy: https://backend-african-marketplace.herokuapp.com/</p>
## <p>Frontend Deploy: https://front-end-rho-gold.vercel.app/</p>

## REGISTER and LOGIN ENDPOINTS

### `[POST] /api/auth/register`

- Request Body:
  - _username required (must be unique)_
  - _password required_

_What You Send_

```json
{
  "username": "john",
  "password": "12345"
}
```

_Server Response_

```json
{
  "message": "Successfully registered john!",
  "user_id": 1
}
```

### `[POST] /api/auth/login`

- Request Body:
  - _username required_
  - _password required_

_What You Send_

```json
{
  "username": "john",
  "password": "12345"
}
```

_Server Response_

```json
{
  "message": "Welcome, john!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva",
  "user_id": 1
}
```

<p>You will use the token given by the server for authentication.</p>
<p>User ID should also be stored as this will be required in the header when adding items.</p>

<p>Sample Credentials you can use for login testing:</p>

- `username: sam, password: 1234`

- `username: frodo, password: 5678`

### `[GET] /api/auth/users`

**_RESTRICTED ENDPOINT_** (token required)

- Returns all users in database, currently public facing but will be restricted.

_Server Response_

```json
{
  "user_id": "1",
  "username": "john",
},
{
  "user_id": "2",
  "username": "user2",
}
"etc..."
```

<hr>

## ITEMS ENDPOINTS

### `[GET] /api/items/`

**_RESTRICTED ENDPOINT_** (token required)

- Returns array of all items in the database.
- 3 sample items have been added.

_Server Response_

```json
[   {
        "item_id": 1,
        "item_name": "Rice",
        "item_description": "Locally grown long grain rice.",
        "item_price": 7.99,
        "item_category": "Grains"
    },
    {
        "item_id": 2,
        "item_name": "Bananas",
        "item_description": "Locally grown bananas.",
        "item_price": 12.99,
        "item_category": "Fruits"
    }
    "etc..."

]

```
### `[POST] /api/items/`

**_RESTRICTED ENDPOINT_** (token AND user_id required)

- Adds a new item in the database. 
  - **required information:**
  - _item_name (string)_
  - _item_description (string)_
  - _item_price (float)_
  - _item_category (string)_

_What You Send:_

```json
{
  "item_name": "Rice",
  "item_description": "Locally grown rice",
  "item_price": 7.99,
  "item_category": "Grains"
}
```

_Server Response:_

```json
{
  "item_name": "Rice",
  "item_description": "Locally grown rice",
  "item_price": 7.99,
  "item_category": "Grains",
  "user_id": 1
}
```

### `[GET] /api/items/:item_id`

**_RESTRICTED ENDPOINT_** (token required)

- Returns the single item associated with that item id. 

_Server Response:_

```json
{
  "item_id": 1,
  "item_name": "Rice",
  "item_description": "Locally grown rice",
  "item_price": 7.99,
  "item_category": "Grains",
  "user_id": 1
}
```

### `[GET] /api/items/user/:user_id`

**_RESTRICTED ENDPOINT_** (token required)

- Returns all items added by a user with provided user id. 

_Server Response:_

```json
[   
    {
        "item_id": 1,
        "item_name": "Rice",
        "item_description": "Locally grown long grain rice.",
        "item_price": 7.99,
        "item_category": "Grains",
        "user_id": 1
    },
    {
        "item_id": 2,
        "item_name": "Bananas",
        "item_description": "Locally grown bananas.",
        "item_price": 12.99,
        "item_category": "Fruits",
        "user_id": 1
    }
    "etc..."

]
```

### `[DELETE] /api/items/:item_id`

**_RESTRICTED ENDPOINT_** (token required)

- Deletes the single item with provided item id.

_Server Response:_

```json
{
    "message": "Deleted 1 item."
}
```
