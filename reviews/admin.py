from django.contrib import admin
from .models import Review

class WordFilter(admin.SimpleListFilter):
    title =  "Filter by words!"
    parameter_name = 'word'
    
    def lookups(self, request, model_admin): #튜플의 리스트를 리턴하는 함수
        return [
            ("goood", "Good"),              #url, 유저화면 순으로 등장
            ("great", "Great"),
            ("awesome", "Awesome")
        ]
    
    def queryset(self, request, reviews): #필터링된 review를 리턴하는 메소드
        word = self.value()
        if word:
            return reviews.filter(payload__contains=word)
        else:
            reviews
            
class ReveiwRatingFilter(admin.SimpleListFilter):
    title = "별점으로 리뷰보기"
    parameter_name = 'star'
    
    def lookups(self, request, model_admin):
        return [
            ('3개이상', "3개이상"),
            ('3개미만', '3개미만')
        ]
    
    def queryset(self, request, reviews):
        feel = self.value()
        if feel == '3개이상':
            return reviews.filter(rating__gte = 3)
        elif feel == '3개미만':
            return reviews.filter(rating__lt = 3)
        else:
            return reviews
            
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "payload",
    )
    list_filter = (
        WordFilter,
        ReveiwRatingFilter,
        "rating", 
        "user__is_host",
        "room__category",
        "room__pet_friendly"
    )
