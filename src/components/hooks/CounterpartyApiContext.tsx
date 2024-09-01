import React, { createContext, useContext } from "react"
import { Counterparty } from "src/util/classes";

export type CounterpartyApi = {
  create: (c: Counterparty) => Promise<any>;
  edit: (id: number, c: Counterparty) => Promise<any>;
  delete: (id: number) => Promise<any>;
  getAll?: () => Promise<any>
}

export const CounterpartyApiContext = createContext<CounterpartyApi>(null);