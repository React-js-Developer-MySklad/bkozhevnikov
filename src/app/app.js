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

        bodyRowElement.style.cursor = 'pointer';
        bodyRowElement.addEventListener('dblclick', () => {
        
            // показываем попап с затемнением (почти как из фреймворка)
            contentModal.querySelector("input[id='name']").value = item.name;
            contentModal.querySelector("input[id='inn']").value =item.inn;
            contentModal.querySelector("input[id='address']").value = item.address;
            contentModal.querySelector("input[id='kpp']").value = item.kpp;
            contentModal.querySelector("input[id='objectId']").value = item.id;
            showModal();
            showGlass(true);
        })
        rowHead.innerHTML = item.name;
    
        tBodyElement.appendChild(bodyRowElement)
    }
}

fillTable();

//Добавить ка
const addButton = rootElement.querySelector("button[id='add-button-container']");

const modalRoot = rootElement.querySelector("div[id='default-modal']")
const contentModal = modalRoot.querySelector("div[id='modal-body']");
const glass = rootElement.querySelector("div[id='glass']");

function resetModal() {
    const fields = contentModal.querySelectorAll("input");
    fields.forEach(field => field.value='');
}

const buttons = modalRoot.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => showGlass(false));
});


function showModal() {
    modalRoot.removeAttribute('class');
    modalRoot.setAttribute('class', 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex');
}

glass.addEventListener('click', () => showGlass(false));


function showGlass(show) {
    if (show) {
        glass.removeAttribute('hidden');
    } else {
        console.log('here');
        glass.setAttribute('hidden', true);
    }
}

addButton.addEventListener("click", () => {
    resetModal();
    showModal();
});

// кнопка submit
const submit = modalRoot.querySelector("button[id='submit-form']");

submit.addEventListener("click", () => {
    const name = contentModal.querySelector("input[id='name']").value;
    const inn = contentModal.querySelector("input[id='inn']").value;
    const address = contentModal.querySelector("input[id='address']").value;
    const kpp = contentModal.querySelector("input[id='kpp']").value;

    const id = contentModal.querySelector("input[id='objectId']").value;
    // разделяем редактирование и создание
    if (id) {
        currentData[currentData.indexOf(currentData.find(row => row.id == id))] = {id: Number(id), name, inn, address, kpp};
    } else {
        const newId = Math.max(...currentData.map(s => s.id)) + 1;
        currentData = currentData.concat({id: Number(newId), name, inn, address, kpp});
    }
    fillTable();
})

