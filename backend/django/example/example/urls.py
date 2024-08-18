"""
URL configuration for example project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from example import views
from django.http import HttpResponse

def return_string(request):
    return HttpResponse('{"type":"django"}')

urlpatterns = [
    path('api/', views.index, name='index'),
    path('api/type', return_string, name='return_string'),
    path('api/question/', views.get_questions, name='get_questions'),
    path('api/question/ids', views.get_question_ids, name='get_question_ids'),
    path('api/question/<int:id>/', views.get_question_by_id, name='get_question_by_id'),
    path('api/question', views.post_answer, name='post_answer'),
]
