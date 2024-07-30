import html from "./app.html";
import './app.css'
import './dom/dom.css'
import { data } from "./util/data";

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

// в app.js создать массив с данными контрагентов
let currentData = data;


// реализовать отображение таблицы на основании массива данных. Колонки: наименование, ИНН, адрес, КПП, кнопка удалить.
const tableRoot = rootElement.querySelector("div[role = 'table']");
const templateHeadRow = rootElement.querySelector("template[id='template-head-column']")
const tBodyElement = tableRoot.querySelector('tbody');

const headRowElement = document.createElement('tr');

const tHeadElement = tableRoot.querySelector('thead');
for(const column of ['Наименование', 'Инн', 'Адрес', 'КПП']) {
    const columnElement = templateHeadRow.content.children[0].cloneNode(true);
    columnElement.innerHTML = column;
    headRowElement.appendChild(columnElement)
}

tHeadElement.appendChild(headRowElement);

const templateRowHead = rootElement.querySelector("template[id='template-row-head']")
const templateRowColumn = rootElement.querySelector("template[id='template-row-column']")

const createRowColumn = (content) => {
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    rowColumn.innerHTML = content;
    return rowColumn;
}


function fillTable() {
    const prevData = tBodyElement.querySelectorAll('tr');
    prevData.forEach(p => p.remove());

    for(const item of currentData) {
        const bodyRowElement = document.createElement('tr');
    
        // add css class
        bodyRowElement.classList.add('dom-table-row')
    
        const rowHead = templateRowHead.content.children[0].cloneNode();
    
        // bodyRowElement.appendChild(rowHead)
        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));
        rowHead.innerHTML = item.name;
    
        tBodyElement.appendChild(bodyRowElement)
    }
}

fillTable();

//Добавить ка
const addButton = rootElement.querySelector("button[id='add-button-container']");

const modalRoot = rootElement.querySelector("div[id='default-modal']")
const contentModal = modalRoot.querySelector("div[id='modal-body']");

function resetModal() {
    const fields = contentModal.querySelectorAll("input");
    fields.forEach(field => field.value='');
}


addButton.addEventListener("click", () => {
    resetModal();
});

// кнопка submit
const submit = modalRoot.querySelector("button[id='submit-form']");

submit.addEventListener("click", () => {
    const name = contentModal.querySelector("input[id='name'").value;
    const inn = contentModal.querySelector("input[id='inn'").value;
    const address = contentModal.querySelector("input[id='address'").value;
    const kpp = contentModal.querySelector("input[id='kpp'").value;

    currentData = currentData.concat({name, inn,address,kpp});
    fillTable();
})