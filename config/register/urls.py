from django.urls import include, path
from . import views

app_name = 'register'

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
]