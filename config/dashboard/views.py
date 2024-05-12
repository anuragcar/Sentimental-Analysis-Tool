from django.shortcuts import render
from register.models import UserProfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import SentimentData
import random

# Create your views here.
def dashboard_view(request):
    user_profile = UserProfile.objects.get(user=request.user)
    favorite_color = user_profile.favorite_color
    return render(request, 'dashboard.html', {'favorite_color': favorite_color})

def text_input(request):
    return render(request, 'query.html')

@csrf_exempt
def analyze_sentiment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get("text")
        sentiment = data.get("sentiment")
        
        if request.user.is_authenticated:
            sentiment_data = SentimentData.objects.create(
                user=request.user,
                text=text,
                sentiment=sentiment
            )
            sentiment_data.save()
        # Here you can store 'text' and 'sentiment' in your database or perform any other logic
        # For simplicity, let's just return the sentiment in the response
        response_data = {"sentiment": sentiment}
        return JsonResponse(response_data)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)