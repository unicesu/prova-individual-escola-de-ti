import axios from 'axios';

// URL base para o backend
const API_URL = 'http://localhost:3001/viagens';

// Função para buscar todas as viagens
export const getViagens = () => {
  return axios.get(API_URL);
};

// Função para criar uma nova viagem
export const createViagem = (viagem) => {
  return axios.post(API_URL, viagem);
};

// Função para buscar uma viagem por ID
export const getViagemById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Função para atualizar uma viagem por ID
export const updateViagem = (id, viagem) => {
  return axios.put(`${API_URL}/${id}`, viagem);
};

// Função para deletar uma viagem por ID
export const deleteViagem = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Função para adicionar um destino a uma viagem
export const addDestino = (id, destino) => {
  return axios.post(`${API_URL}/${id}/destinos`, destino);
};

// Função para remover um destino de uma viagem
export const removeDestino = (id, destinoId) => {
  return axios.delete(`${API_URL}/${id}/destinos/${destinoId}`);
};
