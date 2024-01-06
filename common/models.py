from django.db import models


#db에 들어가지 않는 model(다른 모델에서 reuse)
class CommonModel(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class Meta:
        abstract = True