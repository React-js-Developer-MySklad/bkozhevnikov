import React, { useCallback, useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Modal } from "../modal/modal";
import { Counterparty, defaultConfiguration, defaultData, TableConfiguration } from "./../../util/classes";
import "./app.css"

export const App: React.FC = () => {

    const [configuration, setConfiguration] = useState<TableConfiguration>(defaultConfiguration);
    const [data, setData] = useState<Counterparty[]>(defaultData);
    const [showModal, setShowModal] = useState<boolean>(false);

    const deleteCallback = useCallback((c: Counterparty) => {
        setData(prevValue => [...prevValue.filter(obj => obj !== c)]);
    }, []);

    useState
    return (
        <div className="page">
            <Header showModal={() => setShowModal(true)}/>
            <Table tableConfiguration={configuration} data={data} onDelete={deleteCallback}/>
            <Footer/>
            <Modal show={showModal} hideModal={() => setShowModal(false)}>
                <div>ЭТО КОНТЕНТ ПОПАПА</div>
            </Modal>
        </div>
    )
}