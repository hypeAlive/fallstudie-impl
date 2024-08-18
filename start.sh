#!/bin/bash

echo "Welches Backend möchten Sie starten?"
echo "1) Express"
echo "2) Spring Boot"
echo "3) Django"
read -p "Bitte wählen Sie eine Option (1, 2 oder 3): " choice

generate_secret_key() {
    python3 -c "import random; import string; print(''.join(random.SystemRandom().choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50)))"
}

case $choice in
    1)
        echo "Express Backend wird gestartet..."
        cd backend/express
        npm i
        npm run compileStart
        ;;
    2)
        echo "Spring Boot Backend wird gestartet..."
        cd backend/spring/example
        ./gradlew build
        ./gradlew bootRun
        ;;
    3)
        echo "Django Backend wird gestartet..."
        cd backend/django
        if [ ! -f .env ]; then
            SECRET_KEY=$(generate_secret_key)
            echo "SECRET_KEY=$SECRET_KEY" > .env
        fi
        python3 -m venv .venv
        source .venv/bin/activate
        cd example
        pip install -r requirements.txt
        python3 manage.py runserver
        ;;
    *)
        echo "Ungültige Option. Bitte wählen Sie 1 oder 2."
        ;;
esac