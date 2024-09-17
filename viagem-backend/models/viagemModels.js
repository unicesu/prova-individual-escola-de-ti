const mongoose = require('mongoose');

const DestinoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  viagemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Viagem', required: true }
});

const ViagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataSaida: { type: Date, required: true },
  dataChegada: { type: Date, required: true },
  valor: { type: Number, required: true },
  destinos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destino' }]
});

module.exports = {
  Viagem: mongoose.model('Viagem', ViagemSchema),
  Destino: mongoose.model('Destino', DestinoSchema)
};
