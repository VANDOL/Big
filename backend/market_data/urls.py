from django.urls import include, path
from . import views

urlpatterns = [
    path("dong/", views.dong.as_view()),
    path("market/", views.sale.as_view()),
]
