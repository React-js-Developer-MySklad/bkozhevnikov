import './style.css'
import {createRoot} from "react-dom/client";
import {App} from "./components/app/app";
import {StrictMode} from "react";
import { CounterpartyApiContext, CounterpartyApiImpl } from "./components/hooks/CounterpartyApiContext";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <CounterpartyApiContext.Provider value={CounterpartyApiImpl}>
            <App/>
        </CounterpartyApiContext.Provider>
    </StrictMode>
);
