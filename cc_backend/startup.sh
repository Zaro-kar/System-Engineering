# Migrationsschritte
python manage.py makemigrations 
python manage.py migrate

# Gunicorn-Server starten
# exec gunicorn cc_api.asgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 600
# python manage.py runserver 0.0.0.0:8000
exec uvicorn cc_api.asgi:application --host 0.0.0.0 --port 8000 --workers 1 --timeout-keep-alive 600