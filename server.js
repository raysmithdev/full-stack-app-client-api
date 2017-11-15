const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Yup its on ${PORT}`));

module.exports = {app};
