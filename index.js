const express = require('express');
const bodyParser = require('body-parser');
const tokenGenerator = require('generate-token');
const fs = require('fs').promises;
const reading = require('./helpers/readFile');
const middleware = require('./middleware');
const writing = require('./helpers/writeFile');

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

const leArquivo = async () => {
  const talkerList = await reading('talker.json');
  return talkerList;
};
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => { 
  const talkerList = await reading('talker.json');  
  res.status(200).send(talkerList);
});

app.get('/talker/:id', async (req, res) => {  
  const talkerList = await leArquivo();
  const id = Number(req.params.id);
  const index = talkerList.find((item) => item.id === id);
  if (!index) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(index);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;      
  const validate = validacaoDados(email, password);
  const token = tokenGenerator.generate(16);    
  if (validate.status) {
    return res.status(validate.status).send({ message: validate.message });
  }
  return res.status(200).send({ token });
});

app.post(
  '/talker', 
  middleware.validateToken, 
  middleware.validateName, 
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateWatchedAt,
  middleware.validateRate,
  async (req, res) => {       
    const resposta = await writing('talker.json', req.body);    
    res.status(201).json(resposta);
},
);

app.put(
  '/talker/:id',
  middleware.validateToken, 
  middleware.validateName, 
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateWatchedAt,
  middleware.validateRate,  
  async (req, res) => {
    const talkerList = await leArquivo();
    const id = Number(req.params.id);
    const index = talkerList.filter((item) => item.id !== id);
    const pessoa = req.body;
    pessoa.id = id;
    index.push(pessoa);    
    await fs.writeFile('talker.json', JSON.stringify(index));
    res.status(200).send(pessoa);
    },  
  ); 

app.listen(PORT, () => {
  console.log('Online');
});
