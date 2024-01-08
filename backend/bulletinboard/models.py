from django.db import models
from django.conf import settings

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='uploads/', null=True, blank=True)

class File(models.Model):
    post = models.ForeignKey(Post, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/', default=None)
