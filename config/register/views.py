from django.contrib.auth import login, authenticate, logout 
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib import messages
from django.contrib.auth.models import User
from .models import UserProfile

def register_view(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user=user, bio='Default bio', favorite_color='red')
            return redirect("/home")
    else:
        form = RegisterForm()
    
    return render(response, "register/register.html", {"form":form})

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        messages.success(request, ("You Have Been Logged Out!"))
        return redirect('home:home')