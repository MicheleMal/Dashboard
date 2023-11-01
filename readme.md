# Dashboard

Questo è un progetto di dashboard basato su Angular che consente agli utenti di effettuare l'accesso, registrarsi e gestire i dipendenti. È stato sviluppato seguendo il corso di Edoardo Midale su YouTube su Angularjs [Playlist Angularjs Edoardo Midali](https://www.youtube.com/watch?v=S1yszOtBW4w&list=PLP5MAKLy8lP-x-Ust2YGwspgt4wMJBFXJ&ab_channel=EdoardoMidali).

## Funzionalità
* __Login__; Gli utenti possono accedere tramite email e password se sono già registrati. L'accesso è protetto da un sistema di autenticazione basato su JWT.

* __Registrazione__: Nuovi utente possono registrarsi fornendo nome, cognome, email, password, salario e data di nascita.

* __Page1__: Nella prima pagina gli utenti autenticati possono visualizzare una tabella con tutti i dipendenti (sono gli utenti registrati) e possono modificare o eliminare i dipendenti.

* __Page2__: Nella seconda pagina gli utenti autenticati posso visualizzare le card di tutti i dipendenti (sono gli utenti registrati) con tutte le informazioni.

* __Logout__: Gli utenti possono effettuare il logout dal loro profilo.

## Tecnologie utilizzate
* __Frontend__: Angularjs.
* __Stile__: Angular material.
* __Backend__: Nodejs.
* __Database__: Mongodb.
* __Gestione authenticazione__: Json Web Token (JWT).
* __Sessione attiva__: Local storage.

## Configurazione e Installazione

1. __Clona il repository__:

   ```bash
   git clone https://github.com/tuonome/dashboard-angular.git
   cd dashboard-angular
   ```
2. __Configura il backend__:
    ```bash
    cd backend
    npm install
    ```
    Configura le variabili d'ambiente nel file .env con le tue impostazioni di mongodb e la chiave segreta del JWT.

    * Avvia il backend:
    ```bash
    node index.js
    ```

3. __Configura il frontend__:
    ```bash
    cd frontend
    npm install
    ```
    Configurare i file environment.

    * Avvia il frontend:
    ```bash
    ng serve
    ```

4. __Avviare l'applicazione__:
Apri il browser e vai all'[indirizzo](http://localhost:4200) per accedere all'appliazione.

## Contributi
Sono aperto ai contributi. Sentiti libero, invia pull requedt per migliorare questo progetto.

## Licenza
Questo progetto è concesso in licenza con la licenza MIT.