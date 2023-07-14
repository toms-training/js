import { TaskListGenerator, Task, TasksCollection } from "./tasks/index.js";

const tasksCollection = new TasksCollection;

function init() {
    const addTaskButton = document.querySelector('input[type="button"].add-task');
    addTaskButton.addEventListener('click', addTask);

    
    TaskListGenerator.subscribeDelete(deleteTask);
    TaskListGenerator.subscribeDone(toggleDoneTask)

    TaskListGenerator.generateList(tasksCollection.tasks);
}

document.addEventListener('DOMContentLoaded', init);

/**
 * Asks user for a new task
 * @returns Task
 */
function getTaskFromUser() {
    const input = prompt('Titel der Aufgabe: ');

    if (input === null || input.length === 0) return null;

    let task = new Task(input);

    return task;
}

function addTask() {
    const newTask = getTaskFromUser();
    
    if (!newTask) return;

    tasksCollection.addTask(newTask);

    TaskListGenerator.generateList(tasksCollection.tasks);
}

function deleteTask(event) {
    const target = event.target;

    if (!target.classList.contains('item-action-delete')) return;

    const id = TaskListGenerator.stringToId(target.id);
    tasksCollection.deleteTask(id);
    TaskListGenerator.generateList(tasksCollection.tasks);
}

function toggleDoneTask(event) {
    const target = event.target;
    
    if (!target.classList.contains('item-action-done')) return;

    const id = TaskListGenerator.stringToId(target.dataset.taskid);
    tasksCollection.toggleDone(id);
    TaskListGenerator.generateList(tasksCollection.tasks);
}