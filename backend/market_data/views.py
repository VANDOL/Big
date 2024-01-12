import json
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Fo, Sales,Swot,Fx
from cafe_data.recommend_similar_markets import recommend_similar_markets

#동클릭시 카페데이터 가지고 오는 API
class dong(APIView):
    def get(self, request):
        dong = request.query_params.get('dong')

        if dong is not None:
            swot_data = Swot.objects.filter(dong=dong)
        else:
            return JsonResponse({"error": "No dong code provided"}, safe=False, status=400)

        data = list(swot_data.values())
        

        return JsonResponse(data, safe=False)
    
#상권클릭시 상권 정보 가지고오는 API
class sale(APIView):
    def get(self, request):
        commercial_code = request.query_params.get('commercial_code')

        if commercial_code is not None:
            sales_data = Sales.objects.filter(commercial_code=commercial_code)
        else:
            return JsonResponse({"error": "No commercial code provided"}, safe=False, status=400)

        data = list(sales_data.values())

        return JsonResponse(data, safe=False)
    
#상권 클릭시 상권데이터를 가지고 오는 API
class sang_data1(APIView):
    def get(self, request):
        commercial_code = request.query_params.get('commercial_code')

        if commercial_code is not None:
            sales_data1 = Fo.objects.filter(commercial_area_code=commercial_code)
        else:
            return JsonResponse({"error": "No commercial code provided"}, safe=False, status=400)

        data = list(sales_data1.values())

        return JsonResponse(data, safe=False)
#상권 클릭시 상권데이터를 가지고 오는 API   
class sang_data2(APIView):
    def get(self, request):
        commercial_code = request.query_params.get('commercial_code')

        if commercial_code is not None:
            sales_data2 = Fx.objects.filter(commercial_area_code=commercial_code)
        else:
            return JsonResponse({"error": "No commercial code provided"}, safe=False, status=400)

        data = list(sales_data2.values())

        return JsonResponse(data, safe=False)