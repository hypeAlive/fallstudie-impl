# Fragen App

## Übersicht

Dieses Projekt ist eine Test-Implementierung einer Fragen App, die als Fallstudie zur Analyse von Web Applikations-Technologien dient. Die App stellt nacheinander Fragen mit verschiedenen Antwortmöglichkeiten und zeigt an, ob die gegebene Antwort richtig oder falsch ist.
# Fragen App

## Übersicht

Dieses Projekt ist eine Test-Implementierung einer Fragen App, die als Fallstudie zur Analyse von Web Applikations-Technologien dient. Die App stellt nacheinander Fragen mit verschiedenen Antwortmöglichkeiten und zeigt an, ob die gegebene Antwort richtig oder falsch ist.

## 1. Demo Projekt

- **Fragen App**
  - Nacheinander werden Fragen gestellt mit verschiedenen Antwortmöglichkeiten.
  - Immer zufällige Frage, zur Vereinfachung ohne "merken", welche bereits abgefragt wurde.
  - Es ist immer eine Antwort richtig (a, b oder c).
  - Man kann auswählen und muss dann bestätigen.
  - Nachdem die Frage beantwortet wurde, soll angezeigt werden, ob die Antwort richtig oder falsch war.
  - Der User darf die Lösungen nicht im Quelltext sehen können.

- **Technologien**
  - **Frontends:** Angular, Vuejs, React
  - **Backends:** Express, Spring Boot, Django
  - **Datenbank:** JSON-Datei

## 2. Umsetzung

### 2.1 Frontend

- Kümmert sich um die Visualisierung.
- Kommuniziert über Backend-Schnittstellen.
- Fragt eine zufällige Frage an.
- Sendet und empfängt JSONs.
- Sendet die Antwort und zeigt das Ergebnis an.

### 2.2 Backend

- Hat als simulierte Datenbank eine JSON-Datei, mit der gearbeitet wird.
- Sendet und empfängt JSONs.
- **API Schnittstellen:**
  - **GET /question**
    ```json
    [{
      "id": number, // ID der Frage zur Identifikation
      "question": string // Die Frage
    },...]
    ```
  - **GET /question/{id}**
    ```json
    {
      "id": number, // ID der Frage zur Identifikation
      "question": string // Die Frage
    }
    ```
  - **GET /question/ids**
    ```json
    number[]
    ```
  - **POST /question**
    ```json
    // Request
    {
      "id": number,
      "answer": string // a, b oder c
    }
    // Response
    {
      "id": number,
      "isCorrect": boolean // Antwort richtig oder falsch
    }
    ```

## 3. Ergebnisse und erlangtes Wissen

- Wie viele Zeilen nötig
- Was fällt sonst so auf?
- Geschwindigkeiten

## 4. Installation und Ausführung