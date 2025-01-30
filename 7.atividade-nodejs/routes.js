const express = require('express');
const router = express.Router();
const fs = require('fs');

// Função para ler task
const lerTask = () => {
    const data = fs.readFileSync('./task.json', 'utf-8');
    return JSON.parse(data);
};

// Função para salvar task
const salvarTask = (tasks) => {
    fs.writeFileSync('./task.json', JSON.stringify(tasks, null, 2));
};

// Rota GET task
router.get('/task', (req, res) => {
    const tasks = lerTask();
    res.json(tasks);
});

// Rota POST task
router.post('/task', (req, res) => {
    const { titulo, status } = req.body;
    const tasks = lerTask();

    const newTask = {
        id: tasks.length + 1,
        titulo,
        status: status || false,
    };
    tasks.push(newTask);
    salvarTask(tasks);

    res.status(201).json(newTask);
});

// Rota PUT task
router.put('/task/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, status } = req.body;
    const tasks = lerTask();

    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task não encontrada' });
    }

    if (titulo) task.titulo = titulo;
    if (status !== undefined) task.status = status;

    salvarTask(tasks);
    res.json(task);
});

// Rota DELETE task
router.delete('/task/:id', (req, res) => {
    const { id } = req.params;
    const tasks = lerTask();

    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Task não encontrada' });
    }

    tasks.splice(index, 1);
    salvarTask(tasks);

    res.status(204).send();
});

// Módulo de exportação
module.exports = router;
