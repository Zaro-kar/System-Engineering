"""
URLs for the cc_api project.
"""
from django.urls import path, include


urlpatterns = [
    path('api/', include('cc_wordcloud.urls')),
]
