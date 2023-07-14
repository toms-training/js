import { ListGenerator } from "../list/list-generator.js";
import { Task } from "./task.js";

export class TaskListGenerator extends ListGenerator {
    /**
     * Add a task to HTML list element
     * @param {Task} task
     */
    addListItem(task) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('list-item');

        itemElement.appendChild(this.getListItemTitleElement(task.title, task.done));
        itemElement.appendChild(this.getListItemActionsElement(task.id));

        this.listElement?.appendChild(itemElement);
    }

    getListItemTitleElement(title, done = false) {
        const titleElement = super.getListItemTitleElement(title);

        if (done) titleElement.classList.add('item-done');
        else titleElement.classList.remove('item-done');

        return titleElement;
    }

    getListItemActionsElement(itemId) {
        const actionSpan = super.getListItemActionsElement(itemId);
        const firstChild = actionSpan.children[0];

        actionSpan.insertBefore(this.getDoneActionElement(itemId), firstChild);

        return actionSpan;
    }

    getDoneActionElement(id) {
        const doneButton = document.createElement('span');
        const doneAttribute = document.createAttribute('data-taskId');
        doneAttribute.value = this.idToString(id);
        doneButton.setAttributeNode(doneAttribute);
        doneButton.classList.add('item-action', 'item-action-done', 'btn', 'btn-icon-small');
        doneButton.innerHTML = '&#10004;';

        return doneButton;
    }

    subscribeDone(subscriber) {
        this.listElement?.addEventListener('click', subscriber);
    }
}