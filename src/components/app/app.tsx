import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Counterparty, defaultConfiguration, TableConfiguration } from "./../../util/classes";
import "./app.css"
import { CounterpartyModal } from "../modal/counterpartyModal";
import { TableContext, TableContextApi } from "../hooks/TableContext";

export const App: React.FC = () => {

    const [configuration, setConfiguration] = useState<TableConfiguration>(defaultConfiguration);
    const [data, setData] = useState<Counterparty[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [counterpartyForModal, setCounterpartyForModal] = useState<Counterparty>(null);

    const deleteCallback = useCallback((c: Counterparty) => {
        setData(prevValue => prevValue.filter(obj => obj !== c));
    }, []);


    useEffect(() => {
        fetch('http://localhost:8000/counterparty')
            .then(body => {
                if (body.ok) {
                    body.json().then(
                        json => {
                            const result: Counterparty[] = [];
                            for (let index = 0; index < json.length; index++) {
                                const element = json[index];
                                const single: Counterparty = { ...element };
                                result.push(single);
                            }
                            setData(result);
                        }

                    );
                }
            })
            .catch(e => null);
    }, []);

    const closeModalCallback = useCallback(() => {
        setShowModal(false);
        setCounterpartyForModal(null);
    }, []);

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


    const TableContextImpl: TableContextApi = {
        delete: deleteCallback,
        save: saveCallback
    }

    return (
        <TableContext.Provider value={TableContextImpl}>
            <div className="page">
                <Header showModal={() => {
                    setShowModal(true);
                    setCounterpartyForModal(null);
                }} />
                <Table tableConfiguration={configuration} data={data} onClick={(c) => {
                    setCounterpartyForModal(c);
                    setShowModal(true);
                }} />
                <Footer />
                {showModal && <CounterpartyModal configuration={configuration}
                    data={counterpartyForModal}
                    onClose={closeModalCallback}
                    hideModal={() => setShowModal(false)} />
                }
            </div>
        </TableContext.Provider>
    )
}