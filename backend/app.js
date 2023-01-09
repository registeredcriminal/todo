const express = require('express');

// Access to fetch at 'http://localhost:3000/todos' from origin 'http://localhost:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const logger = require('pino');
const httpLogger = require('pino-http')()

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const jsonBodyParser = bodyParser.json();

const app = express();

app.use(httpLogger);
app.use(cors({
   origin: '*', 
   credentials: false,
   optionSuccessStatus: 200
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', jsonBodyParser, todosRouter);

const db = require("./models");
const Todo = db.todos;

const loadFixtures = process.env.LOAD_FIXTURES || false;

Todo.sync({
    force: process.env.FORCE_DROP_AND_CREATE || false,
    alter: process.env.ALTER_TABLE_SCHEMA || false
}).then(
    () => {
        console.log('Database synced successfully');

        if (loadFixtures) {
            const todoFixtures = require('./fixtures/todos');

            Todo.bulkCreate(todoFixtures).then(() => {
                console.log('Fixtures created')
            })
        }
    },
).catch(
    err => {
        console.error(err)
    });

module.exports = app;
