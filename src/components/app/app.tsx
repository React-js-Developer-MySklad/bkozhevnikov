import React, { useCallback, useContext, useEffect, useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Counterparty, defaultConfiguration, TableConfiguration } from "./../../util/classes";
import "./app.css"
import { CounterpartyModal } from "../modal/counterpartyModal";
import { CounterpartyApiContext } from "../hooks/CounterpartyApiContext";

export const App: React.FC = () => {

    const [configuration, setConfiguration] = useState<TableConfiguration>(defaultConfiguration);
    const [data, setData] = useState<Counterparty[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [counterpartyForModal, setCounterpartyForModal] = useState<Counterparty>(null);

    const api = useContext(CounterpartyApiContext);

    const refetch = useCallback(() => {
        api.getAll()
            .then(resp => {
                const result: Counterparty[] = resp.data;
                setData(result);
            })
            .catch(e => null)
    }, [])

    useEffect(() => {
        refetch();
    }, []);

    const closeModalCallback = useCallback(() => {
        setShowModal(false);
        setCounterpartyForModal(null);
    }, []);

    return (
        <div className="page">
            <Header showModal={() => {
                setShowModal(true);
                setCounterpartyForModal(null);
            }} />
            <Table tableConfiguration={configuration} data={data} onClick={(c) => {
                setCounterpartyForModal(c);
                setShowModal(true);
            }} reloadData={refetch} />
            <Footer />
            {showModal && <CounterpartyModal configuration={configuration}
                data={counterpartyForModal}
                onClose={closeModalCallback}
                hideModal={() => setShowModal(false)} reloadData={refetch} />
            }
        </div>
    )
}