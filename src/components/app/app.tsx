import React, { useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Modal } from "../modal/modal";
import { Counterparty, defaultConfiguration, defaultData, TableConfiguration } from "./../../util/classes";


export const App: React.FC = () => {

    const [configuration, setConfiguration] = useState<TableConfiguration>(defaultConfiguration);
    const [data, setData] = useState<Counterparty[]>(defaultData);

    useState
    return (
        <div>
            <Header/>
            <Table tableConfiguration={configuration} data={data}/>
            <Footer/>
            <Modal/>            
        </div>
    )
}