import React, { createContext, useContext } from "react"
import { Counterparty } from "src/util/classes";


export type TableContextApi = {
  delete: (c: Counterparty) => void;
  save: (c: Counterparty) => void;
}

export const TableContext = createContext<TableContextApi>(null);