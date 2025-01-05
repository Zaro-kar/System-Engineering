# Migrationsschritte
python manage.py makemigrations 
python manage.py migrate

# Gunicorn-Server starten
exec gunicorn flow_api.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 600