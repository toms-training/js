import { Task } from "./task.js";

export class TasksCollection {
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