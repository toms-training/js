const taskSectionId = 'tasks';

// #region Classes

class ListGenerator {
    static listElement = document.getElementById('list');
    static messageElement = document.getElementById('list-message');

    /**
     * Generate HTML list with list items
     * @param {Array<ListItem>} items 
     */
    static generateList(items) {
        this.messageElement.textContent = '';
        this.listElement.innerHTML = '';

        if (items.length === 0) {
            this.messageElement.style.display = 'block';
            this.messageElement.textContent = 'Keine Aufgaben vorhanden :)';
            return;
        }
        
        this.messageElement.style.display = 'none';
        items.forEach(item => this.addListItem(item));
    }

    static idToString(id) {
        return `item-${id}`;
    }

    static stringToId(string) {
        return parseInt(string.replace('item-', ''));
    }

    static subscribeDelete(subscriber) {
        this.listElement.addEventListener('click', subscriber);
    }

    /**
     * Add an item to HTML list element
     * @param {ListItem} item 
     */
    static addListItem(item) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('list-item');

        itemElement.appendChild(this.getListItemTitleElement(item.title));
        itemElement.appendChild(this.getListItemActionsElement(item.id));
        
        this.listElement.appendChild(itemElement);
    }

    static getListItemTitleElement(title) {
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('item-title');
        titleSpan.textContent = title;

        return titleSpan;
    }

    static getListItemActionsElement(itemId) {
        const actionSpan = document.createElement('span');
        actionSpan.classList.add('item-actions');

        actionSpan.appendChild(this.getDeleteActionElement(itemId));
    
        return actionSpan;
    }

    static getDeleteActionElement(id) {
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
            task.done = taskItem.done;

            return task;
        });

        mappedTasks.sort((a, b) => {
            if (a.done < b.done) return -1;
            if (a.done > b.done) return 1;

            return 0;
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

    toggleDone(id) {
        const changed = this.tasks.map(task => {
            if (task.id !== id) return task;

            task.done = !task.done;
            return task;
        });
        
        this.#addTasksToStorage(changed);
    }

    #addTasksToStorage(tasks) {
        sessionStorage.setItem(this.#tasksKey, JSON.stringify(tasks));
    }
}

class TaskListGenerator extends ListGenerator {
    /**
     * Add a task to HTML list element
     * @param {Task} task 
     */
    static addListItem(task) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('list-item');

        itemElement.appendChild(this.getListItemTitleElement(task.title, task.done));
        itemElement.appendChild(this.getListItemActionsElement(task.id));
        
        this.listElement.appendChild(itemElement);
    }

    static getListItemTitleElement(title, done = false) {
        const titleElement = super.getListItemTitleElement(title);

        if (done) titleElement.classList.add('item-done');
        else titleElement.classList.remove('item-done');

        return titleElement;
    }

    static getListItemActionsElement(itemId) {
        const actionSpan = super.getListItemActionsElement(itemId);
        const firstChild = actionSpan.children[0];

        actionSpan.insertBefore(this.getDoneActionElement(itemId), firstChild);
    
        return actionSpan;
    }

    static getDoneActionElement(id) {
        const doneButton = document.createElement('span');
        const doneAttribute = document.createAttribute('data-taskId');
        doneAttribute.value = TaskListGenerator.idToString(id);
        doneButton.setAttributeNode(doneAttribute);
        doneButton.classList.add('item-action', 'item-action-done', 'btn', 'btn-icon-small');
        doneButton.innerHTML = '&#10004;';
    
        return doneButton;
    }

    static subscribeDone(subscriber) {
        TaskListGenerator.listElement.addEventListener('click', subscriber);
    }
}

class Task extends ListItem {
    done = false;
}

// #endregion

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