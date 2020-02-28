# NC-News Project

**NC-News** has been created to allow users to post articles they have written, as well as allowing them to read or comment on other users articles. 

**NC-News** has created a space for users to share their thoughts and opinions, and show off their creative writing!

First things first - have a look at the **hosted NC-News app** following this link:

The app has been designed with UX in mind - with buttons and text displayed in a way that will be clear to the user. For details on the back-end of the project, please see below:

## Getting Started

The following instructions will allow you to set up your own version of NC-News!

### Cloning the project

Clone this repo:
```js
git clone https://github.com/sfmoulton/be-nc-news
```
Then don't forget to hook your local version up to a new GitHub repo, using the below terminal commands (checking the git remotes with each step: git remote -v):

```js
git remote remove origin

git remote add origin <YOUR-GITHUB-URL>
```
Or if you would like to suggest any project changes, please feel free to collaborate and your own push requests to my repo.

## Heroku Hosted API

Please follow the below link to access the API on your browser: 

## Available Endpoints!

I have created a number of endpoints, which I have outlined for you below.

Each route has been constructed with the aim to make NC-News a user-friendly app, which can be easily navigated. 

There are also options for the user to contribute to the site with their own posts or comments - making it truly a collaborative forum.

```js
GET /api
```

- Will return information detailing all of the available endpoints.


```js
GET /api/topics
```

- Will return all of the article topics that ahttps://www.npmjs.com/package/sams-chai-sortedre included on the app.

```js
GET /api/users/:username
```

- Will return information about the requested user, searched by their username.

```js
GET /api/articles
```
- Will return all of the articles available on the app.
- Users can also query by their chosen author or topic.
- It is also possible to chose a property to sort the articles by, and this will default to the article's creation dates. They can also select whether this should be in ascending or descending order (which defaults to descending).

```js
GET /api/articles/:article_id

PATCH /api/articles/:article_id
```

- Using this endpoint, users can choose to return an article by the chosen article ID, or alternatively they can update the number of votes an article has received.

```js
GET /api/articles/:article_id/comments

POST /api/articles/:article_id/comments
```

- Using the above routes, users can return the chosen articles comments, or alternatively they can post a comment on an article of their choosing.

```js
PATCH /api/comments/:comment_id

DELETE /api/comments/:comment_id
```

- With these endpoints, users are able to update the number of votes a comment has received, or they can delete a comment that has been posted.

## Hosted Site

To preview the hosted site, please follow the link below (not forgetting to add your chosen endpoint!):

```js
https://steph-nc-news-app.herokuapp.com/
```

## Project Dependencies

The following dependencies were required to build NC-News:

- ##### Express (https://expressjs.com/)

Express is a minimal and flexible Node.js web application framework, that allowed me to build the server.

- ##### Knex (http://knexjs.org/)

Knex is a SQL query builder, which allowed me to make flexible SQL queries to the database.

- ##### PostgreSQL (https://www.postgresql.org/)

Postgres allowed me to use SQL and postgres commands to help to manage and interact with the database.

### Developer Dependencies

- ##### Chai (https://www.chaijs.com/)

Chai is a TDD assertion library, that facilitated our test writing.

- ##### Chai-Sorted (https://www.npmjs.com/package/chai-sorted) & Sams-Chai-Sorted (https://www.npmjs.com/package/sams-chai-sorted)
    
The above are both plugins for Chai - which allowed us to write tests that implement `<Array.prototype.sort()>`. Sam's plugin allows us to sort by whole numbers, rather than the first digit, which is what Chai-Sorted implements.

- ##### Mocha (https://mochajs.org/)

Mocha was the JS test-runner for the project.

- ##### Supertest (https://www.npmjs.com/package/supertest)

A library that was used to test the server.

## Scripts

Here is an outline of the scripts which are included in the package.json, and how they should be utilised:

```js
"setup-dbs":```
```
- Run to create the database

```js
"seed":
```
- Script that will create the database, and seed the database with our development data.

```js
"seed-test":
```
- Script that will create the test database, and seed the database with our test data.

```js
"seed:prod": 
```
- Script that will create the production database, and will seed the database with our development data.

```js
"test-utils": 
```
- Tests to functions written to format the seed data are running correctly.

```js
"test":
```
- Tests to ensure that all of our endpoints and requests are working correctly.

```js
"migrate:make": 
"migrate-latest": 
"migrate-rollback": 
"migrate-latest:prod": 
"migrate-rollback:prod": 
```
- Scripts that facilitate the database migrations, allowing us to manage the database with incremental changes and store these updates/tables in the migration files.

```js
"start": 
```
- A start script that allows us to host our server using Heroku.


### If you have any questions regarding the project, please get in touch!


