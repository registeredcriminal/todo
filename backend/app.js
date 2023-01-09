const express = require('express');
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