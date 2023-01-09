# Todo Application

Building the serverside of the todo application, which will support CRUD operations.

## Initialization

Use express-generator to start a new express.js project.

```bash
npx express-generator todo-be --no-view

Need to install the following packages:
  express-generator@4.16.1
Ok to proceed? (y) 
npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)

   create : todo-be/
   create : todo-be/public/
   create : todo-be/public/javascripts/
   create : todo-be/public/images/
   create : todo-be/public/stylesheets/
   create : todo-be/public/stylesheets/style.css
   create : todo-be/routes/
   create : todo-be/routes/index.js
   create : todo-be/routes/users.js
   create : todo-be/public/index.html
   create : todo-be/app.js
   create : todo-be/package.json
   create : todo-be/bin/
   create : todo-be/bin/www

   change directory:
     $ cd todo-be

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=todo-be:* npm start
```

Continue the initialization by installing some dependencies:

* Install mysql driver for database integration
* Install body-parser for handling of the HTTP body contents
* Install nodemon for running the node application as a daemon/foreground process

```bash
npm init
npm install express mysql body-parser winston
```

## 