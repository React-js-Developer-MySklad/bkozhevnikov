import React, { useEffect, useState } from "react"
import { Counterparty, TableConfiguration } from "../../util/classes";
import './counterpartyModal.css'
import { Modal } from "../../shared/modal/modal";

type Props = {
    configuration: TableConfiguration;
    data: Counterparty | null;
    onSave: (Counterparty: Counterparty) => void;
    onClose: () => void;
    hideModal: () => void;
}

export const CounterpartyModal: React.FC<Props> = ({configuration, data, onSave, onClose, hideModal}) => {

    const [counterparty, setCounterparty] = useState<Counterparty>(data);
    useEffect(() => {
        setCounterparty(data);
    }, [data])
    
    const modalOverlay = (
        <div className="popup">
                <h1 className="header">Попап</h1>
                <div className="inputs">
                    {configuration.columnNames.map((name, idx) => 
                            <div className="singleInput" key={idx}>
                                <div className="inputLabel">{name}</div>
                                <input value={configuration.valueGetter(name, counterparty)} onChange={(e) => {
                                    setCounterparty(configuration.valueSetter(name, counterparty, e.target.value));
                                }}></input>
                            </div>)
                    }
                </div>
                <div className="buttons">
                    <button className="button" onClick={() => onSave(counterparty)}>Сохранить</button>
                    <button className="button" onClick={onClose}>Закрыть</button>
                </div>
            </div>
    )

    return (
        <Modal hideModal={hideModal}>
            {modalOverlay}
        </Modal>
    )
};
