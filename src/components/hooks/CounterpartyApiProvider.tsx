import React, { ReactNode } from "react"
import { CounterpartyApiContext, CounterpartyApi } from "./CounterpartyApiContext";
import axios from 'axios';
import { Counterparty } from "src/util/classes";

const url = "http://127.0.0.1:8000/counterparty";

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

type Props = {
    children: ReactNode;
}

export const CounterpartyApiProvider: React.FC<Props> = ({ children}) => {
    return (
        <CounterpartyApiContext.Provider value={CounterpartyApiImpl} >
            {children}
        </CounterpartyApiContext.Provider>
    )
};
