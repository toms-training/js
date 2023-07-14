import { TaskListGenerator, Task, TasksCollection } from "./tasks/index.js";

const tasksCollection = new TasksCollection;

function init() {
    window.history.replaceState('list', document.title, document.location);
    window.addEventListener('popstate', (event) => {
        showPage(event.state, false);

        return true;
    });

    loadList();
}

document.addEventListener('DOMContentLoaded', init);

function showPage(page, pushState = true) {
    let pageTitle = '';

    switch (page) {
        case 'form':
            pageTitle = 'Aufgabe hinzufügen';
            if (pushState) window.history.pushState('form', pageTitle, '/form');
            document.title = pageTitle;
            loadForm();
            break;
        default:
            pageTitle = 'Aufgabenverwaltung';
            if (pushState) window.history.pushState('list', pageTitle, '/');
            document.title = pageTitle;
            loadList();
    }
}

function loadList() {
    fetch('templates/list.html')
        .then((resp) => resp.text())
        .then((html) => {
            const main = document.getElementsByTagName('main')[0];
            main.innerHTML = html;

            const taskListGenerator = new TaskListGenerator();
            const addTaskButton = document.querySelector('input[type="button"].add-task');
            addTaskButton?.addEventListener('click', () => showPage('form'));

            taskListGenerator.listElement?.addEventListener('click', deleteTask);
            taskListGenerator.listElement?.addEventListener('click', toggleDoneTask);

            taskListGenerator.generateList(tasksCollection.tasks);
        });
}

function loadForm() {
    fetch('templates/form.html')
        .then((resp) => resp.text())
        .then((html) => {
            const main = document.getElementsByTagName('main')[0];
            main.innerHTML = html;

            /**
             * @type {HTMLFormElement}
             */
            const form = document.forms.newTask;

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                addTask(new Task(form.taskTitle.value));
            });

            form.addEventListener('reset', () => showPage('list'));
        });
}

//#region Event Handler

function addTask(task) {
    if (!task) return;

    tasksCollection.addTask(task);

    showPage('list');
}

function deleteTask(event) {
    const target = event.target;
    const taskListGenerator = new TaskListGenerator();

    if (!target.classList.contains('item-action-delete')) return;

    const id = taskListGenerator.stringToId(target.id);
    tasksCollection.deleteTask(id);
    taskListGenerator.generateList(tasksCollection.tasks);
}

function toggleDoneTask(event) {
    const target = event.target;
    const taskListGenerator = new TaskListGenerator();
    
    if (!target.classList.contains('item-action-done')) return;

    const id = taskListGenerator.stringToId(target.dataset.taskid);
    tasksCollection.toggleDone(id);
    taskListGenerator.generateList(tasksCollection.tasks);
}

//#endregion