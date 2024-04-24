const express = require('express');
const { Pool } = require('pg')

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'holistc_task',
    password: 'ds564',
    port: '5432',
});

function calcularIdade(datanascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - datanascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = datanascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < datanascimento.getDate())) {
        idade--;
    }
    return idade;
}

function calcularSigno(mes, dia) {
    if ((mes === 0 && dia >= 20) || (mes === 1 && dia <= 18)) {
        return 'Aquário';
    } else if ((mes === 1 && dia >= 19) || (mes === 2 && dia <= 20)) {
        return 'Peixes';
    } else if ((mes === 2 && dia >= 21) || (mes === 3 && dia <= 19)) {
        return 'Áries';
    } else if ((mes === 3 && dia >= 20) || (mes === 4 && dia <= 20)) {
        return 'Touro';
    } else if ((mes === 4 && dia >= 21) || (mes === 5 && dia <= 20)) {
        return 'Gêmeos';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 22)) {
        return 'Câncer';
    } else if ((mes === 6 && dia >= 23) || (mes === 7 && dia <= 22)) {
        return 'Leão';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return 'Virgem';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return 'Libra';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return 'Escorpião';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return 'Sagitário';
    } else {
        return 'Capricórnio'; 
    }
}

app.get('/', (req, res) => {
    res.send('Servidor funcionando 🎀')
});

app.get('/users', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM users');
        res.json({
            total: resultado.rowCount,
            users: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os usuários 😲', error);
        res.status(500).send({ mensagem: 'Erro ao obter todos os usuários 😲' })
    }
})

app.post('/users', async (req, res) => {
    try {
        let { nome, email, nascimento } = req.body;

        let datanascimento = new Date(nascimento);
        let idade = calcularIdade(datanascimento);
        let signo = calcularSigno(datanascimento.getMonth(), datanascimento.getDate());

        await pool.query('INSERT INTO users (nome, email, nascimento, idade, signo) VALUES ($1, $2, $3, $4, $5)', [nome, email, datanascimento, idade, signo])
        res.status(201).send({ mensagem: 'Sucesso ao criar usuario 😎' })
    } catch (error) {
        console.error('Erro ao criar o usuario 😲');
        res.status(500).send({ mensagem: 'Erro ao criar o usuario 😲' })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar usuario 😎' })
    } catch (error) {
        console.error('Erro ao deletar o usuario 😲');
        res.status(500).send({ mensagem: 'Erro ao deletar o usuario 😲' })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, nascimento } = req.body;
        const datanascimento = new Date(nascimento);
        const idade = calcularIdade(datanascimento);
        const signo = calcularSigno(datanascimento.getMonth(), datanascimento.getDate());
        await pool.query('UPDATE users SET nome = $1, email = $2, nascimento = $3, idade = $4, signo = $5 WHERE id = $6', [nome, email, datanascimento, idade, signo, id]);
        res.status(200).send({ mensagem: 'Sucesso ao editar usuario 😎' })
    } catch (error) {
        console.error('Erro ao editar o usuario 😲');
        res.status(500).send({ mensagem: 'Erro ao editar o usuario 😲' })
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Usuário não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).send('Erro ao obter usuário por ID');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🍄`)
});
