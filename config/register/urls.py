from django.urls import include, path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("logout/", views.logout, name="logout"),
]