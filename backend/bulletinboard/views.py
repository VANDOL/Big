from django.http import JsonResponse, HttpResponse
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth import get_user_model

@csrf_exempt
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        posts_data = []

        # 각 포스트에 대해 username 추가
        for post in posts:
            post_data = {
                'id': post.pk,
                'title': post.title,
                'content': post.content,
                'created_at': post.created_at,
                'username': post.author.username  # 작성자의 username 추가
            }
            posts_data.append(post_data)

        return JsonResponse(posts_data, safe=False)

    elif request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        # file = request.FILES.get('file') if 'file' in request.FILES else None

        post = Post(title=title, content=content)
        post.save()

        # if file:
        #     File.objects.create(post=post, file=file)

        return JsonResponse({'message': '게시글이 성공적으로 작성되었습니다.', 'post_id': post.pk})

@csrf_exempt
def create_post(request):
    print(request)
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')

        new_post = Post(title=title, content=content)
        new_post.save()
        # if 'file' in request.FILES:
        #     file = request.FILES['file']
        #     File.objects.create(post=new_post, file=file)
        # return JsonResponse({'message': '게시물이 생성되었습니다.', 'post_id': new_post.pk}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)


# @csrf_exempt
# def upload_file(request, pk):
#     if request.method == 'POST':
#         post = Post.objects.get(pk=pk)
#         file = request.FILES['file']
#         fs = FileSystemStorage()
#         filename = fs.save(file.name, file)
#         File.objects.create(post=post, file=filename)
#         return JsonResponse({'message': 'File uploaded successfully'})
    
    
@csrf_exempt
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
        # 게시글의 작성자 정보 가져오기
        author_username = post.author.username if post.author else None
        return JsonResponse({
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at,
            'author_username': author_username  # 작성자의 사용자 이름 추가
            # 'file_url': post.file.url if post.file else None
        })
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=404)

@csrf_exempt
def delete_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    # if post.file:
    #     post.file.delete()  # 파일 삭제
    post.delete()  # 게시글 삭제
    return JsonResponse({'message': '게시글이 성공적으로 삭제되었습니다.'}, status=204)

@csrf_exempt
def update_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)

        if request.method == 'PUT':
            # JSON 데이터 유효성 검사
            if not request.body:
                return JsonResponse({'error': '빈 요청 본문'}, status=400)

            data = json.loads(request.body.decode('utf-8'))
            title = data.get('title', '제목을 입력하세요')
            content = data.get('content', '내용을 작성하세요')
            # file = request.FILES.get('file') if 'file' in request.FILES else None

            post.title = title.strip() if title.strip() != '' else '제목을 입력하세요'
            post.content = content.strip() if content.strip() != '' else '내용을 작성하세요'
            # if file:
            #     # 파일 처리 로직을 추가할 수 있습니다.
            #     pass
            post.save()

            return JsonResponse({'message': '게시글이 성공적으로 업데이트되었습니다.'})

    except json.JSONDecodeError:
        return JsonResponse({'error': '유효하지 않은 JSON 데이터'}, status=400)
    except Post.DoesNotExist:
        return JsonResponse({'error': '게시글을 찾을 수 없습니다.'}, status=404)