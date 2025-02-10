"""
URLs for the cc_api project.
"""
from django.urls import path, include


urlpatterns = [
    path('', include('cc_wordcloud.urls')),
]
