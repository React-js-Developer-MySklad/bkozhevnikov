import React, { useState } from "react";
import './table.css';
import { TableHeadRow } from "./header/tableHead";
import { Counterparty, TableConfiguration } from "./../../util/classes";
import { TableMain } from "./main/tableMain";

type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty[];
    onClick: (c: Counterparty) => void;
    reloadData: () => void;
}

export const Table: React.FC<Props> = ({ tableConfiguration, data, onClick, reloadData }) => {
    return (
        <div>
            <div className="dom-wrapper" role="table">
                <table className="dom-table">
                    <TableHeadRow tableConfiguration={tableConfiguration} />
                    <TableMain tableConfiguration={tableConfiguration} dataCollection={data} onClick={onClick} reloadData={reloadData} />
                </table>
            </div>
        </div>
    )
}