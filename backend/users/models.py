from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    class GenderChoices(models.TextChoices):
        MALE = ("male", '남성')
        FEMALE = ('female', '여성')
    
    avatar = models.URLField(blank = True) #꼭 사진삽입 x
    name = models.CharField(max_length = 150, default = "")
    email = models.CharField(max_length = 254, default = "")
    username = models.CharField(max_length=150, default="", unique=True)
    is_host = models.BooleanField(default = False)
    gender = models.CharField(max_length=10, 
                              choices = GenderChoices.choices,)
    