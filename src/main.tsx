import './style.css'
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { StrictMode } from "react";
import { CounterpartyApiProvider } from './components/hooks/CounterpartyApiProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <CounterpartyApiProvider>
            <App />
        </CounterpartyApiProvider>

    </StrictMode>
);
