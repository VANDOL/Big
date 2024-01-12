from django.http import JsonResponse, HttpResponseForbidden
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

# 게시판의 게시물 목록을 반환하는 API
@csrf_exempt
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        posts_data = []

        # 각 게시물의 정보를 추출하여 리스트에 추가
        for post in posts:
            post_data = {
                'id': post.pk,
                'title': post.title,
                'content': post.content,
                'created_at': post.created_at,
                'username': post.author.username  
            }
            posts_data.append(post_data)

        return JsonResponse(posts_data, safe=False)

# 새 게시물을 생성하는 API
@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        # 요청에서 게시물 정보 추출
        title = request.POST.get('title')
        content = request.POST.get('content')
        author_email = request.POST.get('author')

        # 작성자 이메일을 통해 사용자 객체 가져오기
        try:
            author = get_user_model().objects.get(email=author_email)
        except get_user_model().DoesNotExist:
            return JsonResponse({'error': '사용자가 존재하지 않습니다.'}, status=400)

        # 이미지 파일 처리
        imgfile = request.FILES.get('file')
        if imgfile:
            allowed_extensions = ['jpg', 'jpeg', 'png', 'gif']
            file_extension = imgfile.name.split('.')[-1].lower()
            if not file_extension in allowed_extensions:
                return JsonResponse({'error': '올바른 파일 형식이 아닙니다.'}, status=400)

            # 새 게시물 객체 생성 및 저장
            new_post = Post(title=title, content=content, author=author, imgfile=imgfile)
        else:
            new_post = Post(title=title, content=content, author=author)

        new_post.save()

        return JsonResponse({'message': '게시물이 생성되었습니다.', 'post_id': new_post.pk}, status=201)

# 특정 게시물의 상세 정보를 반환하는 API
@csrf_exempt
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
        imgfile_url = post.imgfile.url if post.imgfile else None
        return JsonResponse({
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at,
            'author_username': post.author.username,
            'imgfile_url': imgfile_url
        })
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)

# 게시물 삭제 API
@csrf_exempt
def delete_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()  # 게시글 삭제
    return JsonResponse({'message': '게시글이 성공적으로 삭제되었습니다.'}, status=204)

# 게시물 업데이트 API
@csrf_exempt
def update_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)

        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            file = request.FILES.get('file')

            # 게시물 정보 업데이트
            post.title = title if title else '제목을 입력하세요'
            post.content = content if content else '내용을 작성하세요'

            # 이미지 파일 처리
            if file:
                allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
                file_extension = file.name.split('.')[-1].lower()
                if not file_extension in allowed_extensions:
                    return JsonResponse({'error': '올바른 파일 형식이 아닙니다.'}, status=400)
                
                post.imgfile = file

            post.save()
            return JsonResponse({'message': '게시글이 성공적으로 업데이트되었습니다.'})

    except Post.DoesNotExist:
        return JsonResponse({'error': '게시글을 찾을 수 없습니다.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)
