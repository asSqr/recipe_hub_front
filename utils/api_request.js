import axios from 'axios';

export const apiUrl = 'https://recipe-hub-back.herokuapp.com/';

export const fetchRecipes = async () => {
  return axios.get(`${apiUrl}admin/v1/mrepository/`);
}

export const fetchRecipe = async id => {
  return axios.get(`${apiUrl}admin/v1/mrepository/${id}/`);
}

export const postRecipe = async param => {
  return axios.post(`${apiUrl}admin/v1/mrepository/`, param);
}

export const postFork = async param => {
  return axios.post(`${apiUrl}api/v1/fork`, param);
}

export const fetchTree = async id_repository => {
  return axios.get(`${apiUrl}api/v1/fork-tree/${id_repository}`);
}

export const patchRecipe = async (id, param) => {
  return axios.patch(`${apiUrl}admin/v1/mrepository/${id}/`, param);
}