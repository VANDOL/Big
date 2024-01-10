from django.http import JsonResponse, HttpResponse
from .models import Post
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required


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
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        author_email = request.POST.get('author')
        try:
            author = get_user_model().objects.get(email=author_email)
        except get_user_model().DoesNotExist:
            return JsonResponse({'error': '사용자가 존재하지 않습니다.'}, status=400)

        imgfile = request.FILES.get('file')
        if imgfile:  # Check if a file is actually uploaded
            new_post = Post(title=title, content=content, author=author, imgfile=imgfile)
        else:
            new_post = Post(title=title, content=content, author=author)

        new_post.save()
        
        return JsonResponse({'message': '게시물이 생성되었습니다.', 'post_id': new_post.pk}, status=201)
 
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
        imgfile_url = post.imgfile.url if post.imgfile else None
        return JsonResponse({
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at,
            'author_username': post.author.username,  # Assuming author is not None
            'imgfile_url': imgfile_url
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

        if request.method == 'POST':
            title = request.POST.get('title')
            content = request.POST.get('content')
            file = request.FILES.get('file')

            post.title = title if title else '제목을 입력하세요'
            post.content = content if content else '내용을 작성하세요'
            if file:
                post.imgfile = file

            post.save()
            return JsonResponse({'message': '게시글이 성공적으로 업데이트되었습니다.'})

    except Post.DoesNotExist:
        return JsonResponse({'error': '게시글을 찾을 수 없습니다.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)