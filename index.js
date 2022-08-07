const express = require('express');
const bodyParser = require('body-parser');
const tokenGenerator = require('generate-token');
const reading = require('./helpers/readFile');
// const writing = require('./helpers/writeFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const validacaoDados = (email, password) => {
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) return { status: 400, message: 'O campo "email" é obrigatório' };
  if (!email.match(validEmail)) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  if (!password) return { status: 400, message: 'O campo "password" é obrigatório' };
  if (password.length < 6) {
  return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' }; 
  }
  return '';
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => { 
  const talkerList = await reading('talker.json');
  // const parsed = JSON.parse(talkerList);  
  res.status(200).send(talkerList);
});

app.get('/talker/:id', async (req, res) => {  
  const talkerList = await reading('talker.json');
  const id = Number(req.params.id);
  const index = talkerList.find((item) => item.id === id);
  if (!index) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(index);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator.generate(16);    
  const validate = validacaoDados(email, password);
  if (validate.status) {
    return res.status(validate.status).send({ message: validate.message });
  }
  return res.status(200).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
