from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (
            "profile", 
            {
                "fields" : ("avatar",
                            "username", 
                            "password", 
                            "email", 
                            "is_host",
                            "gender",
                        ),
                        "classes" : ("wide",)
                },
            ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
                "classes" : ("wide",)
            },
        ),
        (
            "Important dates", 
        {
            "fields": (
                "last_login", 
                "date_joined",
                ),
            "classes" : ("collapse",)
            },
        )
    )

    list_display = ("username", "email", "name", "is_host")