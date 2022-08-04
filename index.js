const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
 const talkerList = fs.readFileSync('./talker.json', 'utf8');
 const parsed = JSON.parse(talkerList);
 res.status(200).json(parsed);
});

app.listen(PORT, () => {
  console.log('Online');
});
