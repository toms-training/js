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

### Übung 06
1. Erstelle eine Klasse TasksCollection als Repository für die Aufgaben.
2. Füge der Klasse ein privates Feld hinzu, dass vom Typ Array, die Tasks speichert.
3. Schreibe anschließend eine Getter-Funktion, die dieses Array zurück gibt.
4. Ergänze die Klasse um eine Schnittstellenmethode addTask(), der ein Task übergeben wird und der dann den bestehenden Tasks hinzugefügt wird.
5. Die Methode generiert eine neue ID, die eindeutig sein muss. Nutze hierfür die reduce() Funktion des Arrays.
6. Nutze in dieser Klasse JavaDoc Kommentare.
7. Passe die Klasse Task so an, dass nur noch der Titel über den Konstruktor mitgegeben wird. Die ID ist initial 0.
8. Passe auch den restlischen Code an, der nun mit der TasksCollection arbeitet.

### Übung 07
1. Aufgaben in HTML so erstellen, dass diese
	* zentriert dargestellt werden
	* als einzelne LI-Elemente in einer UnorderedList (UL) aufgelistet werden
	* einen Titel "Aufgaben" (H1) in einem Header-Element besitzen (wie gezeigt)
	* ein Paragraph-Element mit passendem Hinweis **statt** der Liste anzeigen, wenn keine Aufgaben vorhanden sind
2. Die HTML-Liste soll dynamisch mit Javascript erstellt werden (addTaskToDOM() wird nicht mehr benötigt). 
   Dafür wird folgendes benötigt:
	* Eine Klasse ListGenerator mit folgenden Methoden und Eigenschaften:
		* static #listElement (hier wird das LI-Element gespeichert)
		* static #messageElement (hier wird das P-Element für den Hinweis gespeichert.)
		* static #addListItem(item)
		* static generateList(items)
	* Eine Klasse ListItem
    <br>Tipp: Wie lässt sich der Code so ändern, dass man dynamische Listen später auch für andere Objekte, als die Aufgaben, nutzen könnte? 
    <br>Stichwort: _DRY_
3. Die Klasse Task bleibt bestehen (Tipp: an Vererbung denken)
4. Die Klasse TaskCollection bleibt ebenso bestehen und wird wie folgt angepasst:
	* get tasks()
		* Code wird so optimiert, dass der Inhalt aus dem SessionStorage in ein Array mit Task-Objekten gemappt wird
5. getTaskFromUser() und die While-Schleife bleiben bestehen

### Übung 08
1. Über einen Button soll nun eine Aufgabe hinzugefügt werden können
2. Jede Aufgabe kann vom Benutzer einzeln gelöscht werden
3. Dafür müssen sowohl die Klasse ListGenerator, als auch die Klasse TasksCollection angepasst werden
4. Eine Funktion init() soll folgendes tun:
	* Registriert den EventListener für den onclick-Event für den Hinzufügen-Button 
	* Registriert den EventListener für den onclick-Event der späteren Löschen-Buttons der einzelnen Aufgaben
	* Erstellt die Aufgabenliste
5. Ein EventListener für den DOMContentLoaded-Event von document führt die init() Funktion aus
6. Tipps:
	* getTaskFromUser() bleibt unverändert
	* Die while-Schleife wird nicht mehr benötigt
	* Für die ListItem-Elemente eine CSS-Klasse "list-item" verwenden
	* Bei der Löschfunktion an das Event-Bubbling und die Eigenschaft "id" der Task-Objekte denken

### Übung 09
1. Aufgaben sollen als erledigt markiert werden können
2. Erledigte Aufgaben sollen nach den noch zu erledigenden Aufgaben angezeigt werden
   <br>--> Auch schon, sobald eine Aufgabe als erledigt markiert wird (rutscht nach unten)
3. Erledigte Aufgaben werden durchgestrichen angezeigt
4. Tipps:
	* Darauf achten, dass die Aufgaben aus der letzten Übung vorab im SessionStorage gelöscht sind/werden
	* Da Task um eine neue Eigenschaft erweitert wird, braucht es jetzt auch einen TaskListGenerator, der das ganze behandeln kann
	  <br>--> Vererbung nicht vergessen!

### Übung 10
1. Initialisiere das Projekt für NPM
2. Installiere das NPM-Paket **lite-server** als _**devDependency**_
3. Füge der _**packag.json**_ ein NPM **start**-Script hinzu, dass den lite-server ausführt
4. Starte das NPM-Script
5. Verteile die unterschiedlichen Klassen auf einzelne ES-Module und passe den Code entsprechend an
6. Teste die Anwendung und behebe ggf. alle Fehler

### Übung 11
Für diese Übung soll es ein Formular für das Erstellen einer neuen Aufgabe geben.
Das Formular, als auch die Liste werden dabei dynamisch (codeseitig) über HTML-Vorlagen in das MAIN-Element in der index.html geladen.

#### Neuerungen

* Das Formular
    * Wird als _**form.html**_ im Ordner _**templates**_ abgelegt.
    * Besitzt sowohl einen grünen Speichern-, als auch einen roten Abbrechen-Button.
    * Der Benutzer kann ENTER drücken oder Speichern anklicken, um die Aufgabe zu speichern.
    * Das Feld für die Aufgabenbeschreibung (Titel) soll
        * einen Platzhalter "Aufgabenbeschreibung" gesetzt bekommen
        * erforderlich sein
    * Nach dem Speichern oder Abbrechen wird die Aufgabenliste erneut geladen.
    * Bindet eine eigene Stylesheet-Datei _**form.css**_ aus dem Ordner _**styles**_ ein.
    * Speichern ist ausgegraut, so lang das Eingabefeld ungültig ist.
* Die Liste
    * Wird als _**list.html**_ im Ordner _**templates**_ abgelegt.
    * Die **section#tasks-wrapper** wird dahin verschoben
* Eine Funktion _**loadList()**_ lädt das Template für die Liste in das MAIN-Element:
    * HTML aus dem Template wird eingebunden
    * Eine neue Instanz für **TaskListGenerator** wird erstellt
    * Der EventListener für den Hinzufügen-Button wird registriert
    * EventListener für die Aktionen _**done**_ und _**delete**_ werden im _**TaskListGenerator.listElement**_ registriert
    * Die Liste wird generiert
* Eine Funktion _**loadForm()**_ lädt das Template für das Formular in das MAIN-Element:
    * HTML aus dem Template wird eingebunden
    * Der Submit-Event für das Formular wird registriert:
    * Es soll verhindert werden, dass das Formular tatsächlich abgeschickt wird
    * Der EventListener wird als anonyme Funktion registriert und
      * führt die _**addTask()**_ Funktion aus
      * nutzt den Inhalt des Eingabefeldes im Konstruktor der Klasse **Task**
    * Der Reset-Event für das Formular wird registriert und führt _**loadList()**_ aus


#### Änderungen 

* Das MAIN-Element in der _**index.html**_ enthält keine statischen Kindelemente mehr.
* **ListGenerator** und **TaskListGenerator** sind nicht mehr statisch.
* _**init()**_ ruft nur noch _**loadList()**_ auf
* _**addTask()**_ ruft _**loadList()**_ statt _**TaskListGenerator.generateList()**_ auf
* _**deleteTask()**_ und _**toggleDoneTask()**_ benötigen nun eine Instanz von **TaskListGenerator**

### Übung 12
Die Aufgaben-App soll nun als SPA-Anwendung (Single Page Application) realisiert werden.
Dabei soll bei Aufruf des Formulars in der Adressleiste des Browsers _**/form**_ angezeigt werden und beim zurück navigieren im Browser soll
der Benutzer wieder auf die Liste kommen (Single Page Navigation).

## Neuerungen ##
* Eine Funktion _**showPage()**_ übernimmt das Aktualisieren des **pushState**, des Dokumenten Titels und das Laden der HTML-Vorlage
  * Bekommt den Namen der Seite und ein Boolean, ob **pushState** geändert werden soll, als Parameter übergeben
  * Ist der Name der Seite nicht angegeben wird standardmäßig die Liste geladen
  * Eine weitere mögliche Seite ist das Formular
  * Ändert den Titel entsprechend
    * Für die Liste: Aufgabenverwaltung
    * Für das Formular: Aufgabe hinzufügen
  * Ruft zum Schluss loadList() oder loadForm() auf


## Änderungen ##
* init()
  * Ersetzt in der Historie des Browser den aktuellen Eintrag mit dem Eintrag "list"
  * Registriert den Event "popstate" und führt in einem anonymen EventListener die Funktion showPage() aus
* loadList()
  * Registriert showPage('form'), statt loadForm() für den addTaskButton Click-Event.
* loadForm()
  * Registriert showPage('list'), statt loadList() für den Reset-Event des Formulars.
* addTask()
  * Ruft showPage('list'), statt loadList() auf