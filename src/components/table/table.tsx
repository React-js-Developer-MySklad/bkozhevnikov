import React, {useState} from "react";
import './table.css';
import { TableHeadRow } from "./header/tableHead";
import { Counterparty, TableConfiguration } from "./../../util/classes";
import { TableMain } from "./main/tableMain";

type Props = {
    tableConfiguration: TableConfiguration;
    data: Counterparty[];
}

export const Table: React.FC<Props> = ({tableConfiguration, data}) => {
    return (
        <div>
            <div className="dom-wrapper" role="table">
                <table className="dom-table">
                    <TableHeadRow tableConfiguration={tableConfiguration}/>
                    <TableMain tableConfiguration={tableConfiguration} dataCollection={data}/>
                </table>
            </div>

           <template id="delete-icon">
                {/* <img src="/src/app/assets/delete.svg"> */}
            </template>
        </div>
    )
}