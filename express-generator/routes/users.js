var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'AMik$PMa@vcPR3GjdMt7by0#dMxcj^';

/* GET users listing. */
router.get('/', function (req, res, next) {
  const { token } = req.headers;
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    res.status(200).send(`Bem vindo, ${payload.username}!`);
    console.log(payload);
  } catch (exception) {
    res.status(401).send('Acesso negado');
    console.error(exception);
  }

});

const USERNAME = 'Marllon';
const PASSWORD = 'senha123';

router.post('/login', function (request, response) {
  const { body } = request;
  const { username, password } = body;
  if (username === USERNAME && password === PASSWORD) {
    const payload = {
      username
    }
    const token = jwt.sign(payload, SECRET_KEY);
    response.status(200).json({
      token,
    })
  } else {
    response.status(404).json({
      erro: 'Error!'
    })
  }
});

module.exports = router;
