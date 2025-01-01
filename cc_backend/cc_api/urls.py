from django.urls import path
from .views import StartSessionView, EndSessionView, GetWordsView, VoteView

urlpatterns = [
    path('session/start/', StartSessionView.as_view(), name='start-session'),
    path('session/end/<uuid:uuid>/', EndSessionView.as_view(), name='end-session'),
    path('session/<uuid:uuid>/words/', GetWordsView.as_view(), name='get-words'),
    path('session/<uuid:uuid>/vote/', VoteView.as_view(), name='vote'),
]
