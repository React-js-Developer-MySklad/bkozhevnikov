import React, {useCallback, useState} from "react";
import { Counterparty, TableConfiguration } from "../../../../util/classes"
import "./tableRow.css";

export type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty;
}

export const TableRow: React.FC<Props> = ({tableConfiguration, data}) => {

    const extractData = useCallback(() => {
        const names : string[] = tableConfiguration.columnNames;
        return names.map(name => tableConfiguration.valueGetter(name, data));
    }, [tableConfiguration, data])


    return (
        <tr className="dom-table-row">
            {extractData().map(extracted => <td className="dom-table-row-column">{extracted}</td>)}
        </tr>
    )
}