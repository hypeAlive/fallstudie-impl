#!/bin/bash

echo "Welches Backend möchten Sie starten?"
echo "1) Angular"
echo "2) React"
echo "3) Vue"
read -p "Bitte wählen Sie eine Option (1, 2 oder 3): " choice

case $choice in
    1)
        echo "Angular Frontend wird gestartet..."
        cd frontend/angular
        npm i && npm start
        ;;
    2)
        echo "React Frontend wird gestartet..."
        cd frontend/react/example
        npm i && npm start
        ;;
    3)
        echo "React Frontend wird gestartet..."
        cd frontend/vue
        npm i && npm start
        ;;
    *)
        echo "Ungültige Option. Bitte wählen Sie 1, 2 oder 3."
        ;;
esac