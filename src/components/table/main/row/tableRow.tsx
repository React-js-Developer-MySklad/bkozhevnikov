import React, {useCallback, useState} from "react";
import { Counterparty, TableConfiguration } from "../../../../util/classes"
import "./tableRow.css";
import { DeleteImg } from "../../../assets/delete";


export type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty;
    onDelete: (c: Counterparty) => void;
    onClick: (c: Counterparty) => void;
}

export const TableRow: React.FC<Props> = ({tableConfiguration, data, onDelete, onClick}) => {

    const extractData = useCallback(() => {
        const names : string[] = tableConfiguration.columnNames;
        return names.map(name => tableConfiguration.valueGetter(name, data));
    }, [tableConfiguration, data])


    return (
        <tr className="dom-table-row" onDoubleClick={() => onClick(data)}>
            <td onClick={(event) => onDelete(data)}>
                <DeleteImg/>
            </td>
            {extractData().map((extracted, index) => <td key={index} className="dom-table-row-column"><div className="data-label">{extracted}</div></td>)}
        </tr>
    )
}