const { Viagem, Destino } = require('../models/viagemModels');

exports.createViagem = async (req, res) => {
  const { nome, dataSaida, dataChegada, valor } = req.body;

  if (!nome || !dataSaida || !dataChegada || !valor) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const novaViagem = new Viagem({ nome, dataSaida, dataChegada, valor });
    await novaViagem.save();
    res.status(201).json(novaViagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar viagem' });
  }
};

exports.addDestino = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Nome do destino é obrigatório' });
  }

  try {
    const viagem = await Viagem.findById(req.params.id);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }

    const novoDestino = new Destino({ nome, viagemId: viagem._id });
    await novoDestino.save();

    viagem.destinos.push(novoDestino._id);
    await viagem.save();

    res.status(200).json(viagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar destino' });
  }
};

exports.removeDestino = async (req, res) => {
  const { destinoId } = req.params;

  try {
    const viagem = await Viagem.findById(req.params.id);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }

    viagem.destinos = viagem.destinos.filter((destino) => destino.toString() !== destinoId);
    await viagem.save();

    await Destino.findByIdAndDelete(destinoId);

    res.status(200).json(viagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover destino' });
  }
};

exports.getAllViagens = async (req, res) => {
  try {
    const viagens = await Viagem.find().populate('destinos');
    res.status(200).json(viagens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
};

exports.getViagemById = async (req, res) => {
  try {
    const viagem = await Viagem.findById(req.params.id).populate('destinos');
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    res.status(200).json(viagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar viagem' });
  }
};

exports.updateViagem = async (req, res) => {
  try {
    const viagem = await Viagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    res.status(200).json(viagem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar viagem' });
  }
};

exports.deleteViagem = async (req, res) => {
  try {
    const viagem = await Viagem.findByIdAndDelete(req.params.id);
    if (!viagem) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }
    res.status(200).json({ message: 'Viagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir viagem' });
  }
};
