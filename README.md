# Aufgaben

## Schritte
### Übung 01
1. Projektstruktur anlegen
    * scripts-Ordner
    * index.html
    * im scripts-Ordner eine main.js anlegen
2. index.html mit HTML Layout versehen
3. main.js in index.html einbinden
4. In der index.html ein Element section#tasks hinzufügen
5. In der main.js:
    * Die ID der Section setzen
    * Ein Array 'tasks' anlegen
    * taskTemplate Objekt anlegen mit den Eigenschaften
        * id (Standardwert 0)
        * title (Standardwert leerer String)
    * Eine Funktion getTaskFromUser anlegen
    * Eine Funktion addTaskToDOM anlegen, die einen Task übergeben bekommt
    * Im tasks Array über forEach einzelne task Element mit addTaskToDom zuweisen

### Übung 02
1. getTaskFromUser()
    * Über einen prompt() nach dem Titel der Aufgabe fragen
    * Wird kein Titel eingegeben: null zurückgeben
    * Mit dem Titel ein neues Objekt basierend auf dem taskTemplate erstellen
    * Erstellten task zurückgeben
    * In einer Schleife so lange abfragen tasks-Array füllen, bis die Funktion nichts mehr zurückgibt

### Übung 03
addTaskToDOM() fügt dem section#tasks Element für jede Aufgabe einen neuen Absatz im folgenden Format hinzu:

`<id>) <title>`

### Übung 04
1. Erstellen einer Konstruktorfunktion für Task
2. taskTemplate wird nicht mehr benötigt und kann entfernt werden
3. Konstruktorfunktion stattdessen einsetzen
4. tasks-Array und Funktionen "typsicherer" über JavaDoc Kommentare machen

### Übung 05
1. Wandle die Konstruktorfunktion in eine Klasse um.