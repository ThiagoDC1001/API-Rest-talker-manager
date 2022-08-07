const fs = require('fs').promises;

const reading = async (filename) => {
try {
  const file = await fs.readFile(filename, 'utf8');
  return JSON.parse(file);
} catch (error) {
  console.log(error.message);
}
};

module.exports = reading;