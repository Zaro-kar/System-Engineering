from django.urls import path, include

urlpatterns = [
    path('', include('cc_wordcloud.urls')),
]