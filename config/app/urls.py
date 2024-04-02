from django.urls import include, path
from . import views
from register import views as v

urlpatterns = [
    path("", include("django.contrib.auth.urls")),
    path("", views.home, name="home"),
    path("home/", views.home, name="home"),
    path("register/", v.register, name="register")
]