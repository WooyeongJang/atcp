from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_list, name='test_list'),  # 메인 화면
]

