from rest_framework.serializers import ModelSerializer
from .models import User


class TinyUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "name",
            "avatar",
            "username",
        )

class PrivateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # 또는 필요한 필드들을 명시적으로 나열
        extra_kwargs = {
            'password': {'write_only': True}
        }