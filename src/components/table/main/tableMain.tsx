import React, {useState} from "react";
import { Counterparty, TableConfiguration } from "../../../util/classes"
import { TableRow } from "./row/tableRow";

export type Props = {
    tableConfiguration: TableConfiguration;
    dataCollection: Counterparty[];
}


export const TableMain: React.FC<Props> = ({tableConfiguration, dataCollection}) => {
    return (
        <tbody>
            {dataCollection.map(data => <TableRow data={data} tableConfiguration={tableConfiguration}/>)}
        </tbody>
    );
}