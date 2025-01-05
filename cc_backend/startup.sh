# Migrationsschritte
python manage.py makemigrations 
python manage.py migrate

# Gunicorn-Server starten
# exec gunicorn cc_api.asgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 600
python mange.py runserver 0.0.0.0:8000