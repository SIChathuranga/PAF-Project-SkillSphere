import axios from 'axios';

const API_URL = 'http://localhost:8080/api/userstatus'; // Update if needed

export const getAllStatuses = () => axios.get(API_URL);

export const createStatus = (data) => axios.post(API_URL, data);

export const updateStatus = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteStatus = (id) => axios.delete(`${API_URL}/${id}`);
