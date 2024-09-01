import React, { useState } from "react";
import { Counterparty, TableConfiguration } from "../../../util/classes"
import { TableRow } from "./row/tableRow";

export type Props = {
    tableConfiguration: TableConfiguration;
    dataCollection: Counterparty[];
    onClick: (c: Counterparty) => void;
    reloadData: () => void;
}

export const TableMain: React.FC<Props> = ({ tableConfiguration, dataCollection, onClick, reloadData }) => {
    return (
        <tbody>
            {dataCollection.map((data, index) =>
                <TableRow key={index} data={data} tableConfiguration={tableConfiguration} onClick={onClick} reloadData={reloadData} />)
            }
        </tbody>
    );
}