from django.urls import path
from cc_wordcloud.consumer import WordsUpdateConsumer

websocket_urlpatterns = [
    path('ws/sessions/<str:session_id>/', WordsUpdateConsumer.as_asgi()),
]