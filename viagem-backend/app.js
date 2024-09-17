const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const viagemRoutes = require('./routes/viagemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/viagens', viagemRoutes);

mongoose.connect('mongodb://localhost:27017/viagens', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
