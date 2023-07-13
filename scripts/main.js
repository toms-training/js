const taskSectionId = 'tasks';

// #region Classes

class ListGenerator {
    static #listElement = document.getElementById('list');
    static #messageElement = document.getElementById('list-message');

    /**
     * Add an item to HTML list element
     * @param {ListItem} item 
     */
    static #addListItem(item) {
        const itemElement = document.createElement('li');
        itemElement.textContent = item;
        this.#listElement.appendChild(itemElement);
    }

    /**
     * Generate HTML list with list items
     * @param {Array<ListItem>} items 
     */
    static generateList(items) {
        if (items.length === 0) {
            this.#messageElement.textContent = 'Keine Aufgaben vorhanden :)';
            return;
        }
        
        this.#messageElement.textContent = '';
        this.#listElement.innerHTML = '';
        
        items.forEach(item => this.#addListItem(item));
    }
}

class ListItem {
    id = 0;

    constructor(title) {
        this.title = title;
    }

    toString() {
        return `${this.id}) ${this.title}`;
    }
}

class TasksCollection {
    #tasksKey = 'task';

    /**
     * Returns all tasks
     * @returns {Array<Task>} an array with tasks
     */
    get tasks() {
        const storedTasks = JSON.parse(sessionStorage.getItem(this.#tasksKey)) || [];
        const mappedTasks = storedTasks.map(taskItem => {
            const task = new Task(taskItem.title);
            task.id = taskItem.id;

            return task;
        });

        return mappedTasks;
    }

    /**
     * Adds a new task to collection
     * @param {Task} task 
     */
    addTask(task) {
        const storedTasks = this.tasks;

        const upperId = storedTasks.reduce(
            (previous, current) => current.id > previous ? current.id : previous, 
            0
        );

        task.id = upperId + 1;
        
        storedTasks.push(task);

        sessionStorage.setItem(this.#tasksKey, JSON.stringify(storedTasks));
    }
}

class Task extends ListItem {
    
}

// #endregion

const tasksCollection = new TasksCollection;

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

let newTask = getTaskFromUser();

while (newTask !== null) {
    tasksCollection.addTask(newTask);
    newTask = getTaskFromUser();
}

ListGenerator.generateList(tasksCollection.tasks);