"""
Models for the cc_wordcloud app.
"""
import uuid

from django.db import models

class Session(models.Model):
    """
    Represents a user session for the word cloud application.

    Attributes:
        uuid (UUIDField): A unique identifier for the session.
        numeric_id (CharField): An optional numeric identifier for the session.
        words (JSONField): A dictionary storing words and their corresponding vote counts.
        created_at (DateTimeField): The timestamp when the session was created.
    """

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    code = models.CharField(max_length=3, unique=True, null=True, blank=True)
    words = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.code} ({self.uuid}) {self.words}"

    def add_word(self, word):
        """
        Adds a new word or increases the votes for a given word.

        Args:
            word (str): The word to add or update in the session.
        """
        if word in self.words:
            self.words[word] += 1
        else:
            self.words[word] = 1
        self.save()

    def get_words(self):
        """
        Returns a dictionary of words with their corresponding vote counts.

        Returns:
            dict: A dictionary where keys are words and values are vote counts.
        """
        return self.words
