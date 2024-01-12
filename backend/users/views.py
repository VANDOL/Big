from rest_framework.authtoken.models import Token
import requests
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.permissions import IsAuthenticated
from users.models import User
from . import serializers
from backend import settings

# 현재 로그인한 사용자의 정보를 처리하는 API
class Me(APIView):
    permission_classes = [IsAuthenticated]# 인증된 사용자만 접근 가능
    # 현재 사용자의 정보를 가져옵니다.
    def get(self, request):
        user = request.user
        serializer = serializers.PrivateUserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = serializers.PrivateUserSerializer(
            user,
            data = request.data,
            partial = True,
        )
        if serializer.is_valid():
            user = serializer.save()
            serializer = serializers.PrivateUserSerializer(user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
# 사용자 생성을 처리하는 API
class Users(APIView):
    # 새로운 사용자를 생성
    def post(self, request):
        password = request.data.get("password")
        if not password:
            raise ParseError
        serializer = serializers.PrivateUserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            # user.set_password(password)
            user.save()
            serializer = serializers.PrivateUserSerializer(user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
#비밀번호를 바꾸는 API
class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]#인증받은 사용자 사용가능
    
    def put(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if not old_password or not new_password:
            raise ParseError
        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            raise ParseError
#로그인 API
class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        #이메일과 비밀번호가 없을때 반환
        if not email or not password:
            raise ParseError
        
        try:
            #이메일로 유저를 가지고오는 코드
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"},
                            status=status.HTTP_404_NOT_FOUND)

        # 사용자 인증
        user = authenticate(request, username=user.username, password=password)
        if user:
            login(request, user)
            token = Token.objects.get(user=user)
            print(token.key)
            return Response({"Token": token.key, "ok": "Welcome!"}, status=200)
        else:
            return Response({"success": False ,"error": "wrong password"},
                            status=status.HTTP_400_BAD_REQUEST)      
            
#로그아웃 API         
class LogOut(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({"ok" : "bye!"}, status=200)
    
#회원가입 API      
class SignUp(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            email = request.data.get("email")
            password = request.data.get("password")
            confirmPassword = request.data.get("confirmPassword")
            #비빌번호가 비밀번호확인과 다들때
            if password != confirmPassword:
                return Response(
                    {"error": "비밀번호가 다릅니다"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            #닉네임 중복확인
            if User.objects.filter(username=username).exists():
                return Response(
                    {"error": "닉네임이 이미 있습니다"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # 이메일 중복확인
            if User.objects.filter(email=email).exists():
                return Response(
                    {"error": "아이디가 이미 존재합니다"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
            )
            user.save()
            
            #토큰 생성
            token = Token.objects.create(user=user)
            
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "예상치 못한 오류가 발생했습니다."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )