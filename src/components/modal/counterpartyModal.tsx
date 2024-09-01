import React, { useContext, useEffect, useState } from "react"
import { Counterparty, TableConfiguration } from "../../util/classes";
import './counterpartyModal.css'
import { Modal } from "../../shared/modal/modal";
import { CounterpartyApiContext } from "../hooks/CounterpartyApiContext";
import { Field, Form } from "react-final-form";
import { FormApi } from "final-form";

type Props = {
    configuration: TableConfiguration;
    data: Counterparty | null;
    onClose: () => void;
    hideModal: () => void;
    reloadData: () => void;
}

export const CounterpartyModal: React.FC<Props> = ({ configuration, data, onClose, hideModal, reloadData }) => {

    const api = useContext(CounterpartyApiContext);

    const [counterparty, setCounterparty] = useState<Counterparty>(data);
    useEffect(() => {
        setCounterparty(data);
    }, [data])

    const onSubmit = (counterparty: Counterparty, form: FormApi<Counterparty, Counterparty>) => {
        if (form.getState().modified) {
            if (counterparty.id) {
                api.edit(counterparty.id, counterparty).then(() => {
                    reloadData()
                    onClose();
                });
            } else {
                api.create(counterparty).then(() => {
                    reloadData();
                    onClose();
                });
            }
        } else {
            onClose();
        }
    }

    const modalOverlay = (
        <>
            <Form<Counterparty> onSubmit={onSubmit} initialValues={counterparty}
                validate={(values: Counterparty) => {
                    if (configuration.validation) {
                        return configuration.validation(values);
                    }

                    return undefined;
                }}>
                {
                    props =>
                        <form onSubmit={props.handleSubmit}>
                            <div className="popup">
                                <h1 className="header">Попап</h1>
                                <div className="inputs">
                                    {configuration.columnNames.map((name, idx) =>
                                        <div className="singleInput" key={idx}>
                                            <div className="inputLabel">{name}</div>
                                            <Field name={name} >
                                                {props => {
                                                    return (
                                                        <>
                                                            <div className="fieldContainer">
                                                                <input {...props.input} className="input"/>
                                                                {props.meta.error && <span className="errorMessage">{props.meta.error.message}</span>}

                                                            </div>
                                                        </>
                                                    )
                                                }}
                                            </Field>
                                        </div>)
                                    }
                                </div>
                                <div className="buttons">
                                    <button className="button" type='submit'>Сохранить</button>
                                    <button className="button" onClick={onClose}>Закрыть</button>
                                </div>
                            </div>
                        </form>

                }
            </Form>
        </>

    )

    return (
        <Modal hideModal={hideModal}>
            {modalOverlay}
        </Modal>
    )
};
