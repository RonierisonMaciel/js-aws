const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/tasksDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado ao banco de dados com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err.message));

// Model de tarefas
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: Boolean, required: true }
});

const task = mongoose.model('task', taskSchema);

router.post('/task', async (req, res) => {
    try {
        const { titutlo, status } = req.body;
        const newTask = new task({ title: titutlo, status: status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Problema de conexão com o meu mongoose, não consegui resolver! [está em aberto]

module.exports = router;
