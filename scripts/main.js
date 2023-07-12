const tasks = [];
const taskSectionId = 'tasks';

const taskTemplate = {
    id: 0,
    title: ''
}

function getTaskFromUser() {
    const input = prompt('Titel der Aufgabe: ');

    if (input === null || input.length === 0) return null;

    let task = Object.create(taskTemplate);

    task.id = tasks.length + 1;
    task.title = input;

    return task;
}

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