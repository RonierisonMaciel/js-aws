const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Olá, mundo!</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
