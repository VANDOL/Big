from django.urls import include, path
from . import views

urlpatterns = [
    path("dong/", views.dong.as_view()),#카페 데이터
    path("market/", views.sale.as_view()),#상권 분석 데이터 
    path("sang1/", views.sang_data1.as_view()),#상권 분석 데이터 
    path("sang2/", views.sang_data2.as_view()),#상권 분석 데이터 
]
