const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
    { id: 1, description: 'Gaming' },
    { id: 2, description: 'Watching football' },
    { id: 3, description: 'Smoking hookah' },
    { id: 4, description: 'Eating outside' },
    { id: 5, description: 'Coding' }
    
];

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/tasks', (req, res) => {
    const taskReferences = tasks.map(task => `/task/${task.id}`);
    res.json(taskReferences);
});

app.get('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);


    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.description
    };
    tasks.push(newTask);
    res.status(201).json({ message: 'Task added successfully', task: newTask });
});

app.put('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);


    if (task) {
        task.description = req.body.description;
        res.json({ message: 'Task updated successfully', task});
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully'});
});
