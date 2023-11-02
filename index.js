const express = require('express');
const app = express();
const pool = require('./config/connection.js');
const port = 3000;
const routerTodo = require('./models/todo.js')

app.use(express.json());
app.use('/', routerTodo)

pool.connect((err, client) => {
    if (err) {
      console.error('Database Error', err);
      return;
    }
    console.log('Connect to database succesfully');
  });
  
  app.listen(port, () => {
    console.log(`Server running ${port}`);
  });
  