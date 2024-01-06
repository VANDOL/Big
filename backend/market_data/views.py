from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Sales,Swot


class dong(APIView):
    def get(self, request):
        dong = request.query_params.get('dong')

        if dong is not None:
            swot_data = Swot.objects.filter(dong=dong)
        else:
            return JsonResponse({"error": "No dong code provided"}, safe=False, status=400)

        data = list(swot_data.values())
        

        return JsonResponse(data, safe=False)
    
    
    
class sale(APIView):
    def get(self, request):
        commercial_code = request.query_params.get('commercial_code')

        if commercial_code is not None:
            sales_data = Sales.objects.filter(commercial_code=commercial_code)
        else:
            return JsonResponse({"error": "No commercial code provided"}, safe=False, status=400)

        data = list(sales_data.values())

        return JsonResponse(data, safe=False)