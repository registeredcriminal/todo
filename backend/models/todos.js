module.exports = (sequelize, Sequelize) => {
    const Todos = sequelize.define("todos", {
      title: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      }
    }, {
      timestamps: true,

      // Based on our SQL schema in schema.sql, we need to remap the
      // createdAt to `created_at` and updatedAt to `updated_at
      updatedAt: 'updated_at',
      createdAt: 'created_at'      
    });
  
    return Todos;
  };