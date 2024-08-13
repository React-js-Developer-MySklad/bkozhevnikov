import React, {useState} from "react";
import './table.css';
import { TableHeadRow } from "./header/tableHead";
import { Counterparty, TableConfiguration } from "./../../util/classes";
import { TableMain } from "./main/tableMain";

type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty[];
    onDelete: (c: Counterparty) => void;
}

export const Table: React.FC<Props> = ({tableConfiguration, data, onDelete}) => {
    return (
        <div>
            <div className="dom-wrapper" role="table">
                <table className="dom-table">
                    <TableHeadRow tableConfiguration={tableConfiguration}/>
                    <TableMain tableConfiguration={tableConfiguration} dataCollection={data} onDelete={onDelete}/>
                </table>
            </div>
        </div>
    )
}