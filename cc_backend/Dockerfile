FROM python:3.11-alpine

RUN apk add --no-cache build-base

RUN pip install -U wheel setuptools && pip install -U pip

RUN adduser -D worker
WORKDIR /home/worker
COPY --chown=worker:worker requirements.txt requirements.txt

USER worker

RUN pip install -r requirements.txt

# Füge den Pfad zu .local/bin hinzu
ENV PATH="/home/worker/.local/bin:${PATH}"

COPY --chown=worker:worker . .

CMD ["sh", "startup.sh"]
