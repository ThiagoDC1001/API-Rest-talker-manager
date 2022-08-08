const fs = require('fs').promises;
const reading = require('./readFile');

const writing = async (file, content) => {
  try {    
    const arquivoBase = await reading(file);
    const id = (arquivoBase.length + 1);    
    const addedTalker = { ...content, id };
    arquivoBase.push(addedTalker);
    const arquivoNovo = JSON.stringify(arquivoBase);    
    await fs.writeFile(file, arquivoNovo);
    return addedTalker;    
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = writing;