from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Question
import json
import os

data_path = os.path.join(os.path.dirname(__file__), '../../../data.json')
print(data_path)
questions = []

try:
    with open(data_path, 'r') as file:
        data = json.load(file)
        questions = Question.from_json(data)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON data: {e}")
except KeyError as e:
    print(f"Missing expected key in JSON data: {e}")
except Exception as e:
    print(f"Error loading JSON data: {e}")

def index(request):
    return HttpResponse("Example CaseStudy API for Django!")

def get_questions(request):
    data = [question.get_hidden() for question in questions]
    return JsonResponse(data, safe=False)

def get_question_ids(request):
    data = [question.id for question in questions]
    return JsonResponse(data, safe=False)

def get_question_by_id(request, id):
    question = next((q for q in questions if q.id == id), None)
    if question:
        return JsonResponse(question.get_hidden())
    return HttpResponse(status=404)

@csrf_exempt
def post_answer(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        question = next((q for q in questions if q.id == data['id']), None)
        if question:
            is_correct = question.is_correct(data['answer'])
            response = {
                'id': question.id,
                'isCorrect': is_correct
            }
            return JsonResponse(response)
        return HttpResponse(status=404)
    return HttpResponse(status=400)