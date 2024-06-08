from django.urls import include, path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path("dashboard/", views.dashboard_view, name="dashboard_view"),
    path('text_input/', views.text_input, name='text_input'),
    path('analyze_sentiment/', views.analyze_sentiment, name='analyze_sentiment'),
    path('get_sentiment_data/', views.get_sentiment_data, name='get_sentiment_data'),
]