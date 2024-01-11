from rest_framework.authtoken.models import Token
from time import sleep
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

class Me(APIView):
    permission_classes = [IsAuthenticated]
    
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

class Users(APIView):
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
        
class PublicUser(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username = username)
        except User.DoesNotExist:
            raise NotFound
        serializer = serializers.PrivateUserSerializer(user)
        return Response(serializer.data)

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    
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
        
# class LogIn(APIView):
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
        
#         print(username)
#         print(password)
        
#         if not username or not password:
#             raise ParseError
#         user = authenticate(
#             request,
#             username=username,
#             password=password,
#         )
#         if user:
#             login(request, user)
#             token = Token.objects.get(user=user)
#             print(token.key)
#             return Response({"Token": token.key ,"ok": "Welcome!"}, status=200)
#         else:
#             return Response({"error": "wrong password"},
#                             status=status.HTTP_400_BAD_REQUEST)
class LogIn(APIView):
    def post(self, request):
        email = request.data.get("email")  # username 대신 email 사용
        password = request.data.get("password")
        
        if not email or not password:
            raise ParseError
        
        try:
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
class LogOut(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        logout(request)
        return Response({"ok" : "bye!"}, status=200)

# class JWTLogIn(APIView):
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
#         if not username or not password:
#             raise ParseError
#         user = authenticate(
#             request,
#             username = username,
#             password = password,
#         )
#         if user:
#             token = jwt.encode(
#                 {"pk" : user.pk},
#                 settings.SECRET_KEY,
#                 algorithm = "HS256"
#             )
#             return Response({"token" : token})
#         else:
#             return Response({"error" : "wrong password"})

class GithubLogIn(APIView):
    def post(self, request):
        try:
            code = request.data.get("code")
            access_token = requests.post(
                f"https://github.com/login/oauth/access_token?code={code}&client_id=1cd982bf1af913fb2a36&client_secret={settings.GH_SECRET}",
                headers={"Accept": "application/json"},
            )
            access_token = access_token.json().get("access_token")
            user_data = requests.get(
                "https://api.github.com/user",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/json",
                },
            )
            user_data = user_data.json()
            user_emails = requests.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/json",
                },
            )
            user_emails = user_emails.json()
            try:
                user = User.objects.get(email=user_emails[0]["email"])
                login(request, user)
                return Response(status=status.HTTP_200_OK)
            except User.DoesNotExist:
                user = User.objects.create(
                    username=user_data.get("login"),
                    email=user_emails[0]["email"],
                    name=user_data.get("name"),
                    avatar=user_data.get("avatar_url"),
                )
                user.set_unusable_password()
                user.save()
                login(request, user)
                return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class KakaoLogIn(APIView):
    def post(self, request):
        try:
            code = request.data.get("code")
            access_token = requests.post(
                "https://kauth.kakao.com/oauth/token",
                headers={"Content-type": "application/x-www-form-urlencoded"},
                data={
                    "grant_type": "authorization_code",
                    "client_id": "5ac61531d25aeb411d83ef75a75217e7",
                    "redirect_uri": "http://127.0.0.1:3000/social/kakao",
                    "code": code,
                },
            )
            access_token = access_token.json().get("access_token")
            user_data = requests.get(
                "https://kapi.kakao.com/v2/user/me",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            )
            user_data = user_data.json()
            kakao_account = user_data.get("kakao_account")
            profile = kakao_account.get("profile")
            try:
                user = User.objects.get(email=kakao_account.get("email"))
                login(request, user)
                return Response(status=status.HTTP_200_OK)
            except User.DoesNotExist:
                user = User.objects.create(
                    email=kakao_account.get("email"),
                    username=profile.get("nickname"),
                    name=profile.get("nickname"),
                    avatar=profile.get("profile_image_url"),
                )
                user.set_unusable_password()
                user.save()
                login(request, user)
                return Response(status=status.HTTP_200_OK)

        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class SignUp(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            email = request.data.get("email")
            password = request.data.get("password")
            confirmPassword = request.data.get("confirmPassword")
            
            if password != confirmPassword:
                return Response(
                    {"error": "비밀번호가 다릅니다"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if User.objects.filter(username=username).exists():
                return Response(
                    {"error": "닉네임이 이미 있습니다"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # 이메일 중복 확인
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
            
            token = Token.objects.create(user=user)
            
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "예상치 못한 오류가 발생했습니다."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )