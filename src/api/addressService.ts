import axios from 'axios';
import { Address } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const getAddresses = async (): Promise<Address[]> => {
  const response = await axios.get(`${API_URL}/`);
  return response.data.addresses;
};

export const addAddress = async (addressData: { address: string; country?: string; zip?: string }) => {
  const response = await axios.post(`${API_URL}/`, addressData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
