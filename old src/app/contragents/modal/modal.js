import html from "./modal.html";
import {fillTable, currentData, setCurrentData} from "./../table/table"
const rootElement = document.getElementById('modal');
rootElement.innerHTML = html;

// реализовать отображение таблицы на основании массива данных. Колонки: наименование, ИНН, адрес, КПП, кнопка удалить.

const modalRoot = rootElement.querySelector("div[id='default-modal']")
const contentModal = modalRoot.querySelector("div[id='modal-body']");
const glass = rootElement.querySelector("div[id='glass']");
const buttons = modalRoot.querySelectorAll('button');

export let objectId = undefined;
export function setObjectId(id) {
    objectId = id;
}

buttons.forEach(button => {
    button.addEventListener('click', () => showGlass(false));
});

export function resetModal() {
    const fields = contentModal.querySelectorAll("input");
    fields.forEach(field => field.value='');
    setObjectId(undefined);
}

export function showModal() {
    modalRoot.removeAttribute('class');
    modalRoot.setAttribute('class', 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex');
    modalRoot.setAttribute('aria-hidden', false);
}

glass.addEventListener('click', () => {
    showGlass(false)}
);

function showGlass(show) {
    if (show) {
        glass.removeAttribute('hidden');
    } else {
        glass.setAttribute('hidden', true);
    }
}

// кнопка submit
const submit = modalRoot.querySelector("button[id='submit-form']");

submit.addEventListener("click", () => {
    const name = contentModal.querySelector("input[id='name']").value;
    const inn = contentModal.querySelector("input[id='inn']").value;
    const address = contentModal.querySelector("input[id='address']").value;
    const kpp = contentModal.querySelector("input[id='kpp']").value;

    // разделяем редактирование и создание
    if (objectId) {
        currentData[currentData.indexOf(currentData.find(row => row.id == objectId))] = {id: Number(objectId), name, inn, address, kpp};
    } else {
        const newId = Math.max(...currentData.map(s => s.id)) + 1;
        setCurrentData(currentData.concat({id: Number(newId), name, inn, address, kpp}));
    }
    fillTable();
})

export function onDoubleClick(item) {

    // показываем попап с затемнением (почти как из фреймворка)
    contentModal.querySelector("input[id='name']").value = item.name;
    contentModal.querySelector("input[id='inn']").value =item.inn;
    contentModal.querySelector("input[id='address']").value = item.address;
    contentModal.querySelector("input[id='kpp']").value = item.kpp;
    setObjectId(item.id)
    showModal();
    showGlass(true);
}
