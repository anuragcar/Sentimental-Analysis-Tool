from django.urls import include, path
from . import views

app_name = 'home'

urlpatterns = [
    path("", views.home_view, name="home"),
    path("home/", views.home_view, name="home"),
]