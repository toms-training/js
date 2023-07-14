const taskSectionId = 'tasks';

// #region Classes

class ListGenerator {
    static #listElement = document.getElementById('list');
    static #messageElement = document.getElementById('list-message');

    /**
     * Generate HTML list with list items
     * @param {Array<ListItem>} items 
     */
    static generateList(items) {
        this.#messageElement.textContent = '';
        this.#listElement.innerHTML = '';

        if (items.length === 0) {
            this.#messageElement.style.display = 'block';
            this.#messageElement.textContent = 'Keine Aufgaben vorhanden :)';
            return;
        }
        
        this.#messageElement.style.display = 'none';
        items.forEach(item => this.#addListItem(item));
    }

    static idToString(id) {
        return `task-${id}`;
    }

    static stringToId(string) {
        return parseInt(string.replace('task-', ''));
    }

    static subscribeDelete(subscriber) {
        this.#listElement.addEventListener('click', subscriber);
    }

    /**
     * Add an item to HTML list element
     * @param {ListItem} item 
     */
    static #addListItem(item) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('list-item');

        itemElement.appendChild(this.#getListItemTitleElement(item.title));
        itemElement.appendChild(this.#getListItemActionsElement(item.id));
        
        this.#listElement.appendChild(itemElement);
    }

    static #getListItemTitleElement(title) {
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('item-title');
        titleSpan.textContent = title;

        return titleSpan;
    }

    static #getListItemActionsElement(itemId) {
        const actionSpan = document.createElement('span');
        actionSpan.classList.add('item-actions');

        actionSpan.appendChild(this.#getDeleteActionElement(itemId));
    
        return actionSpan;
    }

    static #getDeleteActionElement(id) {
        const deleteButton = document.createElement('span');
        deleteButton.id = this.idToString(id);
        deleteButton.classList.add('btn', 'btn-icon-small', 'item-action', 'item-action-delete');
        deleteButton.innerHTML = 'X';
        deleteButton.title = 'Aufgabe löschen';
    
        return deleteButton;
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

        this.#addTasksToStorage(storedTasks);
    }

    deleteTask(id) {
        const filtered = this.tasks.filter(task => task.id !== id);
        this.#addTasksToStorage(filtered);
    }

    #addTasksToStorage(tasks) {
        sessionStorage.setItem(this.#tasksKey, JSON.stringify(tasks));
    }
}

class Task extends ListItem {
    
}

// #endregion

const tasksCollection = new TasksCollection;

function init() {
    const addTaskButton = document.querySelector('input[type="button"].add-task');
    addTaskButton.addEventListener('click', addTask);

    ListGenerator.subscribeDelete(deleteTask);

    ListGenerator.generateList(tasksCollection.tasks);
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

    ListGenerator.generateList(tasksCollection.tasks);
}

function deleteTask(event) {
    const target = event.target;
    const id = ListGenerator.stringToId(target.id);
    tasksCollection.deleteTask(id);
    ListGenerator.generateList(tasksCollection.tasks);
}