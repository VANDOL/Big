import json
from django.http import JsonResponse
from django.shortcuts import render
from cafe_data import recommend_similar_markets
from .models import Sales
from rest_framework.views import APIView

# Create your views here.
class recommend(APIView):
    def post(self, request):
        try:
            input_data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error':'Invalid JSON data'},status=400)
 
        # 예시로 작성, 실제로는 데이터 포맷에 맞게 수정 필요
        service_name = input_data.get('cate') #업종
        locations = input_data.get('gu')#행정구
        deposit = input_data.get('rv1')#보증금
        month_rent = input_data.get('rv2')#월임대료
        man = input_data.get('rv3')#남성
        woman = float(100 - man)#여성
        workplace = input_data.get('rv4')#노동인구
        resident = float(100-workplace)#상주인구
        age = input_data.get('age')#연령
        user_preferences = {workplace,resident,man,woman,age}
       
        # recommend_similar_markets 함수 호출
        result_data = recommend_similar_markets(service_name, locations, user_preferences, n=5)
        
        for i in len(result_data.row):
            result = Sales.object.filter(Monthly_Average_Sales = result_data[i][0])
            result_data.extend(result)
        # 결과를 JSON 형태로 반환
        return JsonResponse(result_data.to_dict(orient='records'))