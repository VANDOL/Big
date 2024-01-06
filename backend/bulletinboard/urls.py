from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    path('posts/<int:pk>/upload/', views.upload_file, name='upload_file'),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/<int:pk>/delete/', views.delete_post, name='delete_post'),
    path('posts/<int:pk>/update/', views.update_post, name='update_post'),
]