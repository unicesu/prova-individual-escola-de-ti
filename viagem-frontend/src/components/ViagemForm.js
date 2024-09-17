import React, { useState } from 'react';
import { createViagem, updateViagem } from '../services/viagemService';

const ViagemForm = ({ viagemAtual, onSubmitSuccess }) => {
  const [nome, setNome] = useState(viagemAtual ? viagemAtual.nome : '');
  const [dataSaida, setDataSaida] = useState(viagemAtual ? viagemAtual.dataSaida : '');
  const [dataChegada, setDataChegada] = useState(viagemAtual ? viagemAtual.dataChegada : '');
  const [valor, setValor] = useState(viagemAtual ? viagemAtual.valor : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const viagem = {
      nome,
      dataSaida,
      dataChegada,
      valor
    };

    try {
      if (viagemAtual) {
        await updateViagem(viagemAtual._id, viagem);
        alert('Viagem atualizada com sucesso!');
      } else {
        await createViagem(viagem);
        alert('Viagem criada com sucesso!');
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Erro ao salvar a viagem', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome da Viagem:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>
      <div>
        <label>Data de Saída:</label>
        <input type="date" value={dataSaida} onChange={(e) => setDataSaida(e.target.value)} required />
      </div>
      <div>
        <label>Data de Chegada:</label>
        <input type="date" value={dataChegada} onChange={(e) => setDataChegada(e.target.value)} required />
      </div>
      <div>
        <label>Valor da Viagem:</label>
        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
      </div>
      <button type="submit">Salvar Viagem</button>
    </form>
  );
};



export default ViagemForm;
