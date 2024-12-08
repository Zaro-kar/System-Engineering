# Verwende ein leichtes Node.js-Image
FROM node:16-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die package.json und installiere die Abhängigkeiten
COPY package*.json ./
RUN npm install --production

# Kopiere den Rest der Anwendung
COPY . .

# Exponiere den Port, auf dem die App läuft
EXPOSE 3000

# Starte die Anwendung
CMD ["node", "server.js"]
