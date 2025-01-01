from django.db import models
import uuid
from django.contrib.postgres.fields import JSONField

class Session(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    numeric_id = models.AutoField(primary_key=True)
    words = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.numeric_id} ({self.uuid})"

    def add_word(self, word):
        """
        Adds a new word or increases the votes for a given word.
        """
        if word in self.words:
            self.words[word] += 1
        else:
            self.words[word] = 1
        self.save()

    def get_words(self):
        """
        Returns a list of word with number of votes.
        """
        return self.words
