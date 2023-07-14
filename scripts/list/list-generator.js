export class ListGenerator {
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