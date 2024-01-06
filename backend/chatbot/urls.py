from django.urls import path
from . import views


urlpatterns = [
    path("response", views.chatbot_response),
]