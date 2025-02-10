"""
App configuration for the cc_wordcloud application.
"""

from django.apps import AppConfig


class CcWordcloudConfig(AppConfig):
    """
    Configuration class for the cc_wordcloud app.

    This class sets the default auto field and specifies the name of the app.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cc_wordcloud'
