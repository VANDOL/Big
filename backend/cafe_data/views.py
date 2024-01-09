import json
from django.http import JsonResponse
from django.shortcuts import render
import pandas as pd
from cafe_data.recommend_similar_markets import recommend_similar_markets
from .models import Sales
from rest_framework.views import APIView

# 분석하는 코드
class recommend(APIView):
    def post(self, request):
        try:
            input_data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error':'Invalid JSON data'},status=400)
 
        # 예시로 작성, 실제로는 데이터 포맷에 맞게 수정 필요
        service_name = input_data['cate']
        locations = input_data['gu']
        deposit = int(input_data['rv1'])
        month_rent = int(input_data['rv2'])
        man = float(input_data['rv3'])
        woman = float(100 - man)  # 여성 비율을 계산
        workplace = float(input_data['rv4'])
        resident = float(100 - workplace)  # 상주인구 비율을 계산
        age_groups = input_data['age']
        
        list =["광진구", "관악구", "강서구", "동대문구", "영등포구", "양천구", "종로구", "성동구", "용산구", "강북구", "노원구", "동작구", "성북구", "서초구", "강동구", "은평구", "서대문구", "도봉구", "중구", "강남구", "중랑구", "마포구", "금천구", "송파구", "구로구"]
        list_a = ['20','30','40','50','60']
        
        if len(locations) == 0 :
            locations = list
        
        if len(age_groups) == 0 :
            age_groups = list_a

        # 나이 그룹을 설정하기 위한 딕셔너리 초기화
        age_group_dict = {
            'Age_Group_20s': 0,
            'Age_Group_30s': 0,
            'Age_Group_40s': 0,
            'Age_Group_50s': 0,
            'Age_Group_60s': 0,
        }
        for age in age_groups:
            if age in ['20']:
                age_group_dict['Age_Group_20s'] = 1
            elif age in ['30']:
                age_group_dict['Age_Group_30s'] = 1
            elif age in ['40']:
                age_group_dict['Age_Group_40s'] = 1
            elif age in ['50']:
                age_group_dict['Age_Group_50s'] = 1
            elif age in ['60']:
                age_group_dict['Age_Group_60s'] = 1

        user_preferences = {
            'Workplace': workplace,
            'Resident': resident,
            'Male': man,
            'Female': woman,
        }
        
        user_preferences.update(age_group_dict)
        
        result_data = recommend_similar_markets(service_name, locations, user_preferences, n=5)
    
        commercial_codes_and_percentage = result_data[["Commercial_Code", "percentage"]]
        commercial_codes_and_percentage_dict = commercial_codes_and_percentage.to_dict(orient='records')

        return JsonResponse(commercial_codes_and_percentage_dict, safe=False)
