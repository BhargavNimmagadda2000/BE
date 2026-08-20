const app = require('./requestHandler');

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});