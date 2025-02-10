"""
URLs for the cc_wordcloud app.
"""

from django.urls import path
from .views import (
    StartSessionView,
    CloseSessionView,
    VoteView,
    GetSessionView,
)

urlpatterns = [
    path('sessions/start/',
         StartSessionView.as_view(),
         name='start-session'),
    path('sessions/<uuid:uuid>/close/',
         CloseSessionView.as_view(),
         name='end-session'),
    path('sessions/<uuid:uuid>/vote/',
         VoteView.as_view(),
         name='vote'),
    path('session/', GetSessionView.as_view(), name='get-session'),
]
