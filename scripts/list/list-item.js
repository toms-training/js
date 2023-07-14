export class ListItem {
    id = 0;

    constructor(title) {
        this.title = title;
    }

    toString() {
        return `${this.id}) ${this.title}`;
    }
}