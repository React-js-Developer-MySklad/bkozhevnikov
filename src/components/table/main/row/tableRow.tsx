import React, { useCallback, useContext, useState } from "react";
import { Counterparty, TableConfiguration } from "../../../../util/classes"
import "./tableRow.css";
import { DeleteImg } from "../../../assets/delete";
import { CounterpartyApiContext } from "../../../hooks/CounterpartyApiContext";


export type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty;
    onClick: (c: Counterparty) => void;
    reloadData: () => void;
}

export const TableRow: React.FC<Props> = ({ tableConfiguration, data, onClick, reloadData }) => {

    const api = useContext(CounterpartyApiContext);

    const extractData = useCallback(() => {
        const names: string[] = tableConfiguration.columnNames;
        return names.map(name => tableConfiguration.valueGetter(name, data));
    }, [tableConfiguration, data])


    return (
        <tr className="dom-table-row" onDoubleClick={() => onClick(data)}>
            <td onClick={() => api.delete(data.id).then(() => reloadData())}>
                <DeleteImg />
            </td>
            {extractData().map((extracted, index) => <td key={index} className="dom-table-row-column"><div className="data-label">{extracted}</div></td>)}
        </tr>
    )
}