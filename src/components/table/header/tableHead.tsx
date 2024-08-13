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
                <th style={{width: '40px'}}></th>
                {tableConfiguration.columnNames.map((data, index) => {
                    return (
                        <th key={index} scope="row" className="dom-table-row-head">
                            <div className="header-label">{data}</div>
                        </th>)
                    }
                )}
            </tr>
        </thead>
        
    )
}