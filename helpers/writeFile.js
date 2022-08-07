const fs = require('fs').promises;

const writing = async (file, content) => {
  try {
    const write = fs.appendFile(file, content);
    return write;
  } catch (error) {
    console.lot(error.message);
  }
};

module.exports = writing;