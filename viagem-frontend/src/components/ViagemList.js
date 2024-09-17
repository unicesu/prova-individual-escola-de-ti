import React, { useEffect, useState } from 'react';
import { getViagens, deleteViagem } from '../services/viagemService';
import { Link } from 'react-router-dom';

const ViagemList = () => {
  const [viagens, setViagens] = useState([]);

  // Função para buscar as viagens ao carregar o componente
  useEffect(() => {
    fetchViagens();
  }, []);

  const fetchViagens = async () => {
    try {
      const response = await getViagens();
      setViagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar viagens:', error);
    }
  };

  // Função para excluir uma viagem
  const handleDelete = async (id) => {
    try {
      await deleteViagem(id);
      // Atualiza a lista de viagens após a exclusão
      fetchViagens();
    } catch (error) {
      console.error('Erro ao excluir viagem:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Viagens</h2>
      <Link to="/nova-viagem" className="btn btn-primary mb-4">
        Adicionar Nova Viagem
      </Link>
      <ul className="list-group">
        {viagens.map((viagem) => (
          <li key={viagem._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{viagem.nome}</h5>
              <p>Data de Saída: {new Date(viagem.dataSaida).toLocaleDateString()}</p>
              <p>Data de Chegada: {new Date(viagem.dataChegada).toLocaleDateString()}</p>
              <p>Valor: R${viagem.valor.toFixed(2)}</p>
            </div>
            <div>
              <Link to={`/viagem/editar/${viagem._id}`} className="btn btn-info btn-sm mr-2">
                Editar
              </Link>
              <button onClick={() => handleDelete(viagem._id)} className="btn btn-danger btn-sm">
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViagemList;
