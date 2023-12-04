const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

const Todo = require('./models/Todo');

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos/new', async(req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    await todo.save();

    res.json(todo);

})

app.put('/todos/text/:id', async(req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, {
        text: req.body.text
    });

    res.json(result);
})

app.put('/todos/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    await todo.save();

    res.json(todo);
})

app.delete('/todos/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
