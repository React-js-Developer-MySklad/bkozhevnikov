import React, {useState} from "react";
import { TableConfiguration } from "../../../util/classes"
import './tableHead.css'

export type Prop = {
    tableConfiguration: TableConfiguration;
}

export const TableHeadRow: React.FC<Prop> = ({tableConfiguration}) => {

    return (
        <thead className="dom-table-head">
            <tr>
                {tableConfiguration.columnNames.map(data => {
                    return <th scope="row" className="dom-table-row-head">{data}</th>;})
                }
            </tr>
        </thead>
        
    )
}