from django.urls import include, path
from . import views

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
]