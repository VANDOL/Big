from django.db import models
from django.conf import settings
from users.models import User


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    imgfile = models.ImageField(upload_to='post_images/', null=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        default=1
    )

# class File(models.Model):
#     post = models.ForeignKey(Post, related_name='files', on_delete=models.CASCADE)
#     file = models.FileField(upload_to='uploads/', default=None)