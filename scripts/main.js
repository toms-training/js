const taskSectionId = 'tasks';

class TasksCollection {
    /**
     * @type {Array<Task>}
     */
    #tasks = [];

    /**
     * Returns all tasks
     * @returns {Array<Task>} an array with tasks
     */
    get tasks() {
        return this.#tasks;
    }

    /**
     * Adds a new task to collection
     * @param {Task} task 
     */
    addTask(task) {
        const upperId = this.tasks.reduce(
            (previous, current) => current.id > previous ? current.id : previous, 
            0
        );

        task.id = upperId + 1;
        this.#tasks.push(task);
    }
}

class Task {
    #id = 0;
    #title = '';
    
    constructor(title) {
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }
}

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

const tasksCollection = new TasksCollection;

let newTask = getTaskFromUser();

while (newTask !== null) {
    tasksCollection.addTask(newTask);
    newTask = getTaskFromUser();
}

tasksCollection.tasks.forEach(addTaskToDOM);