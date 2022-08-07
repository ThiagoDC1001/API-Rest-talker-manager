const express = require('express');
const bodyParser = require('body-parser');
const reading = require('./helpers/readFile');
// const writing = require('./helpers/writeFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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
  res.json(index);
});

app.listen(PORT, () => {
  console.log('Online');
});
