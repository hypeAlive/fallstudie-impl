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
  - **Styling:** Tailwind CSS mit DaisyUI

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
  - **GET /type**
  ```json
  {
    "type": "express" | "spring" | "django" // Backend Typ
  }

## 3. Installation und Ausführung

### Voraussetzungen

- Node.js mit npm, python, Java müssen je nach Verwendung installiert sein.
- Git Bash sollte auf Windows verwendet werden.

### Schritte

1. **Repository klonen:**

   ```bash
   git clone https://github.com/hypeAlive/fallstudie-impl.git
   cd fallstudie-impl
   ```

2. **Backend starten:**

   ```bash
   ./start_backend.sh
   ```

   Das Backend läuft auf Port 8080. Wenn Port 8080 blockiert ist, funktioniert es nicht.

3. **Frontend starten:**

   ```bash
   ./start_frontend.sh
   ```

   Das Frontend läuft auf Port 4200. Wenn Port 4200 blockiert ist, funktioniert es möglicherweise nicht.
