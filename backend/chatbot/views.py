from django.http import JsonResponse
from openai import OpenAI
from django.conf import settings
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
async def chatbot_response(request):
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    assistant = client.beta.assistants.retrieve("asst_5WVX627XVTiobNaXuNoNzAtV")
    thread = client.beta.threads.create()

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

        while True:
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            if run.status == "completed":
                break

        messages = client.beta.threads.messages.list(thread_id=thread.id)

        if messages.data:
            response_text = messages.data[0].content[0].text.value
        else:
            response_text = "챗봇으로부터 응답을 받지 못했습니다."

        return JsonResponse({"response": response_text})

    else:
        return JsonResponse({"error": "Invalid request"}, status=400)