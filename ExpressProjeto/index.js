const express = require('express');
const bodyParser = require('body-parser');
const {
    validationResult,
    checkSchema,
} = require('express-validator/check');

const server = express();
const porta = 3000;

const usuarios = [
    {
        id: 1,
        nome: 'Marllon',
        idade: 23
    },
    {
        id: 2,
        nome: 'José',
        idade: 12
    },
    {
        id: 3,
        nome: 'Frizzo',
        idade: 32
    }
]

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use((request, response, next) => {
    const { token } = request.query;
    if (token === 'super-secreto') {
        next();
    } else {
        response.status(403).send('Acesso não permitido');
    }
})

server.get('/usuarios/:usuarioId/',
    checkSchema({
        usuarioId: {
            in: "params",
            isInt: {
                options: { min: 1 }
            },
            isInt: true,
            toInt: true,
            errorMessage: 'Informe o id do usuário'
        }
    }),
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        const { usuarioId } = request.params;
        const usuarioEncontrado = usuarios.find(usuario => usuario.id === usuarioId);
        usuarioEncontrado
            ? response.status(201).json(usuarioEncontrado)
            : response.status(404).send('Usuário não encontrado')
    });

server.get('/usuarios/', (request, response) => {
    response.status(201).json(usuarios);
});

server.post('/usuarios/',
    checkSchema({
        nome: {
            in: "body",
            isString: true,
            isLength: {
                options: { min: 1 }
            },
            errorMessage: 'Informe o nome de usuário'
        },
        idade: {
            in: "body",
            optional: true,
            isInt: {
                options: { min: 1 }
            },
            isInt: true,
            errorMessage: 'Informe a idade do usuário'
        }
    }),
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }

        const { body } = request;
        usuario = {
            id: usuarios.length + 1,
            nome: body.nome,
            idade: body.idade,
        }
        usuarios.push(usuario);
    })

server.listen(porta, () => {
    console.log('Servidor iniciado na porta', porta);
});
