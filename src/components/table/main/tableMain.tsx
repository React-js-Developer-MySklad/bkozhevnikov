import React, {useState} from "react";
import { Counterparty, TableConfiguration } from "../../../util/classes"
import { TableRow } from "./row/tableRow";

export type Props = {
    tableConfiguration: TableConfiguration;
    dataCollection: Counterparty[];
    onDelete: (c: Counterparty) => void;
}


export const TableMain: React.FC<Props> = ({tableConfiguration, dataCollection, onDelete}) => {
    return (
        <tbody>
            {dataCollection.map((data, index) => <TableRow key={index} data={data} tableConfiguration={tableConfiguration} onDelete={onDelete}/>)}
        </tbody>
    );
}