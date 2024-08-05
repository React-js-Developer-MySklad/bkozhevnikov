import html from "./header.html";
import "./header.css"
import {resetModal, showModal} from "./../contragents/modal/modal"

const rootElement = document.getElementById('header');
rootElement.innerHTML = html;

const addButton = rootElement.querySelector("button[id='add-button-container']");

addButton.addEventListener("click", () => {
    resetModal();
    showModal();
});

