module.exports = {
    test: {
        dsn: "sqlite::memory:",
        dialect: "sqlite"
    },
    development: {
        dsn: "mysql://todo:todo@localhost/todo",
        dialect: "mysql"
    }
};