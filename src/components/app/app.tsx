import React, { useCallback, useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Modal } from "../modal/modal";
import { Counterparty, defaultConfiguration, defaultData, TableConfiguration } from "./../../util/classes";
import "./app.css"
import { ModalContent } from "../modal/content/content";

export const App: React.FC = () => {

    const [configuration, setConfiguration] = useState<TableConfiguration>(defaultConfiguration);
    const [data, setData] = useState<Counterparty[]>(defaultData);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [counterpartyForModal, setCounterpartyForModal] = useState<Counterparty>(null);

    const deleteCallback = useCallback((c: Counterparty) => {
        setData(prevValue => [...prevValue.filter(obj => obj !== c)]);
    }, []);


    const closeModalCallback = useCallback(() => {
        setShowModal(false);
        setCounterpartyForModal(null);
    },[]);

    const saveCallback = useCallback((c: Counterparty) => {
        if (!c) {
            return;
        }
        if (c?.id) {
            const prev = data.filter(obj => obj.id == c.id)[0]
            data[data.indexOf(prev)] = c;
            setData([...data]);
            closeModalCallback();
            return;
        }
        c.id = Math.max(...data.map(s => s.id)) + 1
        setData(prev => [...prev, c]);
        closeModalCallback();
    }, [data]);


    useState
    return (
        <div className="page">
            <Header showModal={() => {
                setShowModal(true);
                setCounterpartyForModal(null);
            }}/>
            <Table tableConfiguration={configuration} data={data} onDelete={deleteCallback} onClick={(c) => {
                setCounterpartyForModal(c);
                setShowModal(true);
            }}/>
            <Footer/>
            <Modal show={showModal} hideModal={() => setShowModal(false)}>
                <ModalContent configuration={configuration} data={counterpartyForModal} onSave={saveCallback} onClose={closeModalCallback}/>
            </Modal>
        </div>
    )
}