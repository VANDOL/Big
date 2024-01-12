import os
from django.http import JsonResponse
from openai import OpenAI
import json
from django.views.decorators.csrf import csrf_exempt


# 챗봇에 연결하며 대화를 주고받는 API
@csrf_exempt
def chatbot_response(request):
    #OPEN_AI와 통신하기 위한 기초적인 설정
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    client = OpenAI(api_key=OPENAI_API_KEY)
    assistant = client.beta.assistants.retrieve(os.environ.get('OPENAI_ASSISTANTS_KEY'))
    thread = client.beta.threads.create()
    
    #대화를 받았을때 동작
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message")

        client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=user_message,
        )

        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
            instructions="",
        )
        # 실행완료까지 대기
        while True:
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            if run.status == "completed":
                break
        #messages에 응답메시지 설정
        messages = client.beta.threads.messages.list(thread_id=thread.id)

        if messages.data:
            response_text = messages.data[0].content[0].text.value
        else:
            response_text = "챗봇으로부터 응답을 받지 못했습니다."
        #messages 반환
        return JsonResponse({"response": response_text})

    else:
        return JsonResponse({"error": "Invalid request"}, status=400)