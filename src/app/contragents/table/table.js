import html from "./table.html";
import './table.css'
import { data } from "./../../util/data";
import {resetModal, showModal, onDoubleClick} from "./../modal/modal"

const rootElement = document.getElementById('table');
rootElement.innerHTML = html;

// в app.js создать массив с данными контрагентов
export let currentData = data;
export function setCurrentData(newCurrentData) {
    currentData = newCurrentData;
}

// реализовать отображение таблицы на основании массива данных. Колонки: наименование, ИНН, адрес, КПП, кнопка удалить.
const tableRoot = rootElement.querySelector("div[role = 'table']");
const templateHeadRow = rootElement.querySelector("template[id='template-head-column']")
const iconTemplate = rootElement.querySelector("template[id='delete-icon']")
const tBodyElement = tableRoot.querySelector('tbody');

const headRowElement = document.createElement('tr');

const tHeadElement = tableRoot.querySelector('thead');
for (const column of ['Наименование', 'Инн', 'Адрес', 'КПП', '']) {
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

export function fillTable() {
    const prevData = tBodyElement.querySelectorAll('tr');
    prevData.forEach(p => p.remove());

    for(const item of currentData) {
        const bodyRowElement = document.createElement('tr');

        bodyRowElement.classList.add('dom-table-row')

        const rowHead = templateRowHead.content.children[0].cloneNode();

        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));

        const deleteButton = iconTemplate.content.children[0].cloneNode(true);
        const deleteButtonContainer = templateRowColumn.content.children[0].cloneNode();
        deleteButtonContainer.appendChild(deleteButton);
        deleteButton.addEventListener('click', () => {
            currentData = currentData.filter(row => !(row.id == item.id)) ;
            fillTable();
        });

        bodyRowElement.append(deleteButtonContainer);


        bodyRowElement.style.cursor = 'pointer';
        bodyRowElement.addEventListener('dblclick', () => {
            onDoubleClick(item);
        })
        rowHead.innerHTML = item.name;

        tBodyElement.appendChild(bodyRowElement)
    }
}

fillTable();

