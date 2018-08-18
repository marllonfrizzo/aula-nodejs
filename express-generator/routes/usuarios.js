const express = require('express');

const router = express.Router();

const { Usuario } = require('../models');

router.post('/', function (req, res) {
    const { body } = req;
    const { nome, nascimento, email } = body;
    Usuario.create({
        nome, nascimento, email
    })
        .then(usuario => {
            res.status(201).json(usuario);
        })
        .catch(ex => {
            res.status(412).send('Não foi possível inserir o registro.');
            console.error(ex);
        })
})

router.get('/:usuarioId', function (req, res) {
    const { params } = req;
    const { usuarioId } = params;
    Usuario.findById(usuarioId)
        .then(usuario => {
            if (!usuario) {
                res.status(404).send('Usuário não encontrado!');
            } else {
                res.status(201).json(usuario);
            }
        })
        .catch(ex => {
            console.error(ex);
        })
})

router.put('/:usuarioId', function (req, res) {
    const { params, body } = req;
    const { usuarioId } = params;
    const { nome, nascimento, email } = body;
    Usuario.findById(usuarioId)
        .then(usuario => {
            if (!usuario) {
                res.status(404).send('Usuário não encontrado!');
            } else {
                return usuario.update({
                    nome, nascimento, email
                }).then(() => {
                    res.status(200).json(usuario);
                });
            }
        })
        .catch(ex => {
            console.error(ex);
        })
})

router.delete('/:usuarioId', function (res, req) {
    const { params } = req;
    const { usuarioId } = params;
    Usuario.destroy({
        where: {
            id: usuarioId,
        }
    })
        .then(deletados => {
            if (deletados > 0) {
                res.status(204).send(`${deletados} usuários deletados.`);
            } else {
                res.status(412).send('Deu ruim!')
            }
        })
        .catch(ex => {
            console.error(ex);
        });

})

router.get('/', function (req, res) {
    const { query } = req;
    const { nome } = query;
    Usuario.findAll({
        where: {
            nome: `%${nome}%`,
        }
    }).then(usuarios => {
        res.status(200).json(usuarios);
    })
})
module.exports = router
