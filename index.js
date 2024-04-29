const express = require('express');
const { Pool } = require('pg')

const app = express();
const port = 4006;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harry',
    password: 'ds564',
    port: '5432',
});


app.get('/bruxin', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxin');
        res.json({
            total: resultado.rowCount,
            bruxin: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os bruxos 😲');
        res.status(500).send({ mensagem: 'Erro ao obter todos os bruxos 😲' })
    }
})

app.post('/bruxin', async (req, res) => {


    try {
        const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

            if (sangue == "trouxa" || sangue == "mestiço" || sangue == "puro"){
                console.error("sangue bom!");
            } else {
                console.error("sangue inválido!");
                res.status(500).send({ mensagem: "sangue inválido " })
        }

        if (casa == "sonserina" || casa == "grifnória" || casa == "lufa-lufa" || casa == "corvinal"){
            console.error("casa existe!");
        } else {
            console.error("casa inválida!");
            res.status(500).send({ mensagem: "casa inválida" })
    }
        

        await pool.query('INSERT INTO bruxin (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, sangue, patrono])
        res.status(201).send({ mensagem: 'Sucesso ao criar bruxin 😎' })
    } catch (error) {
        console.error('Erro ao criar o bruxo 😲', error);
        res.status(500).send({ mensagem: 'Erro ao criar o bruxo 😲' })
    }
})

app.delete('/bruxin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxin WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar bruxin 😎' })
    } catch (error) {
        console.error('Erro ao deletar o usuario 😲');
        res.status(500).send({ mensagem: 'Erro ao deletar o bruxin 😲' })
    }
})

app.put('/bruxin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa, habilidade, sangue, patrono } = req.body;
        await pool.query('UPDATE bruxin SET nome = $1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6, id = $7', [nome, idade, casa, habilidade, sangue, patrono, id]);
        res.status(200).send({ mensagem: 'Sucesso ao editar bruxo 😎' })
    } catch (error) {
        console.error('Erro ao editar o usuario 😲');
        res.status(500).send({ mensagem: 'Erro ao editar o bruxo 😲' })
    }
})

app.get('/bruxin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxin WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: 'Bruxo não encontrado' });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar o bruxo 😲', error);
        res.status(500).send({ mensagem: 'Erro ao selecionar o bruxooooooooo 😲' })
    }
})


app.get('/bruxin/nome/:nome', async (req, res) => {
    console.log("passou")
    try {
        const { nome } = req.params;
        console.log(nome)
        console.log(typeof (nome))
        const resultado = await pool.query('SELECT * FROM bruxin WHERE nome = $1', [nome]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ mensagem: `Bruxo ${nome} não encontrado` });
        } else {
            res.status(200).json(resultado.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao selecionar o bruxo por nome 😲', error);
        res.status(500).send({ mensagem: `Erro ao selecionar bruxo ${nome}` })
    }
})



////////Varinhas


app.get('/varinha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinha');
        res.json({
            total: resultado.rowCount,
            varinha: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todas as varinhas 😲');
        res.status(500).send({ mensagem: 'Erro ao obter todas as varinhas 😲' })
    }
})

app.post('/varinha', async (req, res) => {
    try {
        const { material, comprimento, nucleo, madeIn } = req.body;
        await pool.query('INSERT INTO varinha (material, comprimento, nucleo, madeIn) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, madeIn])
        res.status(201).send({ mensagem: 'Sucesso ao criar varinhas 😎' })
    } catch (error) {
        console.error('Erro ao criar a varinha 😲', error);
        res.status(500).send({ mensagem: 'Erro ao criar a varinha 😲' })
    }
})

app.delete('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao deletar varinha 😎' })
    } catch (error) {
        console.error('Erro ao deletar a varinha 😲');
        res.status(500).send({ mensagem: 'Erro ao deletar a varinha 😲' })
    }
})

app.put('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, madeIn } = req.body;
        await pool.query('UPDATE varinha SET material = $1, comprimento = $2, nucleo = $3, madeIn = $4', [material, comprimento, nucleo, madeIn]);
        res.status(200).send({ mensagem: 'Sucesso ao editar varinha 😎' })
    } catch (error) {
        console.error('Erro ao editar a varinha 😲');
        res.status(500).send({ mensagem: 'Erro ao editar varinha 😲' })
    }
})

app.get('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, madeIn } = req.body;
        await pool.query('SELECT * FROM varinha WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'Sucesso ao selecionar varinha 😎' })
    } catch (error) {
        console.error('Erro ao selecionar a varinha 😲');
        res.status(404).send({ mensagem: 'Erro ao selecionar a varinha 😲' })
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🍄`)
});