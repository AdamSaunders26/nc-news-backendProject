# **Northcoders News API**

https://nc-news-app.onrender.com/api - Hosted version of the API

## **Project Summary**

This API has multiple different endpoints allowing users to access and manipulate a wide range of data. It uses Express and PostgreSQL to enable this and is built using Node.js.

It also features middleware following the MVC model as well as for erro rhandling, including 400 and 404 errors.

## **Cloning**

If you would like to clone and run this repo locally, you will need to do the following:

Firstly, clone the repo:

- `git clone https://github.com/AdamSaunders26/nc-news-backendProject`

You will then need to run these commands:

- `npm install`
- `npm run setup-dbs`
- `npm run seed`

_Optional for non-test access_

- `npm start`

You will also need to make sure you set up two .env files in order to access the databases correctly.

- .env.development - `PGDATABASE=nc_news`
- .env.test - `PGDATABSE=nc_news_test`

## **Version Requirements**

You should ensure that you have the following installed:

- Node.js V20.0.0 or higher - https://nodejs.org/en/download/current
- PostgreSQL V15 or higher - https://postgresapp.com/downloads.html
