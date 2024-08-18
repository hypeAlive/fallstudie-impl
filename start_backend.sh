#!/bin/bash

echo "Welches Backend möchten Sie starten?"
echo "1) Express"
echo "2) Spring Boot"
echo "3) Django"
read -p "Bitte wählen Sie eine Option (1, 2 oder 3): " choice

generate_secret_key() {
  if command -v python3 &>/dev/null; then
      python3 -c "import random; import string; print(''.join(random.SystemRandom().choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50)))"
  else
      python -c "import random; import string; print(''.join(random.SystemRandom().choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(50)))"
  fi
}

cd types/typescript
npm i
npm run build
cd ../..

case $choice in
    1)
        echo "Express Backend wird gestartet..."
        cd backend/express
        npm i && npm run compileStart
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
                if command -v python3 &>/dev/null; then
                    python3 -m venv .venv
                else
                    python -m venv .venv
                fi

                alias python3=python

                if [ -f .venv/Scripts/activate ]; then
                    source .venv/Scripts/activate
                elif [ -f .venv/bin/activate ]; then
                    source .venv/bin/activate
                else
                    echo 'Activate script not found.'
                fi
                cd example
                if [ ! -f .env ]; then
                    SECRET_KEY=$(generate_secret_key)
                    echo 'SECRET_KEY=$SECRET_KEY' > .env
                fi

                pip install -r requirements.txt

                if command -v python3 &>/dev/null; then
                  python3 manage.py runserver 8080
                else
                  python manage.py runserver 8080
                fi
        ;;
    *)
        echo "Ungültige Option. Bitte wählen Sie 1, 2 oder 3."
        ;;
esac