
# Polling API 

Polling API using express js and mongodb.
 



## Documentation

[Check out the live API & docs](https://mayurkakade.stoplight.io/docs/polling-api-rest-api/ab7542e38b000-polling-api) 


## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/DevMayur/Polling-API
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` - can be set from mongodb database


## Run Locally

Go to the project directory

```bash
  cd Polling-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

OR 

```bash
  npm run watch
```


## API Reference

#### Get all questions

```http
  GET /api/questions
```

#### Create a question

```http
  POST /api/questions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title`   | `string` | **Required**. Question     |


#### Get a question

```http
  GET /api/questions/{questionId}
```

#### Delete a question

```http
  DELETE /api/questions/{questionId}
```

#### Create an option

```http
  POST /api/questions/{questionId}/options
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `text`   | `string` | **Required**. Option     |


#### Add a vote

```http
  POST /api/questions/{questionId}/options/{optionId}
```
OR ( following request is added to add vote using get request )

```http
  POST /api/questions/{questionId}/options/{optionId}/addVote
```

#### Delete an option

```http
  DELETE /api/questions/{questionId}/options/{optionId}
```



## Authors

- [@Mayur Kakade](https://www.github.com/DevMayur)


## ✨ Motive

This code is built with help of coding ninjas lectures for the skill test.

