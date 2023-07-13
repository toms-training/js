/**
 * @type {Array<Task>}
 */
const tasks = [];
const taskSectionId = 'tasks';

function Task(id, title) {
    this.id = id,
    this.title = title
}

/**
 * Asks user for a new task
 * @returns Task
 */
function getTaskFromUser() {
    const input = prompt('Titel der Aufgabe: ');

    if (input === null || input.length === 0) return null;

    let task = new Task(id, input);

    task.id = tasks.length + 1;
    task.title = input;

    return task;
}

/**
 * Adds a task to the DOM.
 * @param {Task} task 
 */
function addTaskToDOM(task) {
    const section = document.getElementById(taskSectionId);
    const paragraph = document.createElement('p');

    paragraph.innerText = `${task.id}) ${task.title}`;

    if (!section) throw new Error(`Element mit der ID ${taskSectionId} nicht gefunden`);

    section.appendChild(paragraph);
}

let newTask = getTaskFromUser();

while (newTask !== null) {
    tasks.push(newTask);
    newTask = getTaskFromUser();
}

tasks.forEach(addTaskToDOM);