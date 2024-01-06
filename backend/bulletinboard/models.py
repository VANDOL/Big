from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='uploads/', null=True, blank=True)

class File(models.Model):
    post = models.ForeignKey(Post, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/', default=None)
