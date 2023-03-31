The `Board` component is a React functional component that renders a grid of cells that follow the rules of Conway's Game of Life. The component takes in three props:

-   `rows`: the number of rows in the grid
-   `cols`: the number of columns in the grid
-   `updateFrequency`: the frequency (in milliseconds) at which the board should update

The `Board` component renders a grid of cells, where each cell can be either alive or dead. The initial state of the grid is randomly generated when the component mounts, and the user can click on individual cells to toggle their state. The component also includes controls to play, pause, and reset the board.

### State

The `Board` component has three pieces of state:

-   `board`: a 2D array of `Cell` objects representing the state of the grid
-   `isPlaying`: a boolean indicating whether the board is currently playing or paused
-   `intervalId`: a reference to the interval ID used to update the board

### useEffect

The `useEffect` hook is used to set up the interval that updates the board when `isPlaying` is true. When the component mounts or `isPlaying` changes, the hook sets up the interval using `setInterval`. When the component unmounts or `isPlaying` changes to false, the hook clears the interval using `clearInterval`.

### Handlers

The `Board` component has three click handlers:

-   `handleCellClick`: toggles the `alive` state of an individual cell
-   `handlePlayPauseClick`: toggles the `isPlaying` state of the board
-   `handleResetClick`: generates a new random state for the board

### Buttons

The `Board` component renders two buttons:

-   The play/pause button: toggles between the `PAUSE_BUTTON` and `PLAY_BUTTON` icons depending on the `isPlaying` state
-   The reset button: displays the `RESET_BUTTON` string

### Types

The `Board` component uses two types:

-   `Cell`: an object with the properties `row` (the row index of the cell), `col` (the column index of the cell), and `alive` (a boolean indicating whether the cell is alive or dead)
-   `BoardProps`: an object with the properties `rows`, `cols`, and `updateFrequency` (all of type `number`)

## Unit tests / Jest,react-testing-library
- Nel primo test, semplicemente renderizziamo il componente per assicurarci che non si blocchi.

- Nel secondo test, simuliamo il clic su una cella per invertirne lo stato e verifichiamo se lo stato è effettivamente cambiato.

- Nel terzo test, simuliamo il clic sui pulsanti di avvio e arresto per avviare e fermare il gioco, rispettivamente. Usiamo anche jest.useFakeTimers() per simulare le funzioni setInterval e clearInterval, e jest.useRealTimers() per ripristinare il comportamento originale di queste funzioni.

- Nel quarto test, simuliamo il clic sul pulsante di ripristino per resettare la griglia e poi verifichiamo se tutte le celle hanno effettivamente cambiato stato. Usiamo screen.getAllByTestId(/cell-.*/) per ottenere tutte le celle dal loro attributo data-testid, che abbiamo impostato su "cell-${row}-${col}" nel componente Board.


## End2end tests / Cypress
### Definiamo quattro test:

-   Il primo test controlla che la scheda e i controlli siano visibili sulla pagina.
-   Il secondo test controlla che possiamo attivare/disattivare le celle cliccando su di esse.
-   Il terzo test controlla che possiamo avviare e interrompere il gioco, e che le celle vengano aggiornate di conseguenza.
-   Il quarto test controlla che possiamo ripristinare il gioco e che le celle vengano ripristinate al loro stato iniziale.

Per ogni test, usiamo cy.visit per caricare l'applicazione nel browser e poi usiamo cy.get per selezionare e interagire con gli elementi sulla pagina. Usiamo anche comandi Cypress come should e wait per verificare che determinate cose accadano sulla pagina.

`pnpx cypress open` 