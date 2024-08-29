import React, { createContext, useContext } from "react"
import { Counterparty } from "src/util/classes";
import axios from 'axios';

const url = "http://127.0.0.1:8000/counterparty";

export type CounterpartyApi = {
  create: (c: Counterparty) => Promise<any>;
  edit: (id: number, c: Counterparty) => Promise<any>;
  delete: (id: number) => Promise<any>;
  getAll?: () => Promise<any>
}

export const getCounterparty = async (id: number) => {
  return await axios.get(`${url}/${id}`);
}

export const getAllCounterparties = async () => {
  return await axios.get(`${url}`);
}

export const addCounterparty = async (c: Counterparty) => {
  return await axios.post(url, c);
}

export const editCounterparty = async (id: number, c: Counterparty) => {
  return await axios.put(`${url}/${id}`, c);
}

export const deleteCounterparty = async (id: number) => {
  return await axios.delete(`${url}/${id}`);
}

export const CounterpartyApiImpl: CounterpartyApi = {
  create: addCounterparty,
  edit: editCounterparty,
  delete: deleteCounterparty,
  getAll: getAllCounterparties
}

export const CounterpartyApiContext = createContext<CounterpartyApi>(null);