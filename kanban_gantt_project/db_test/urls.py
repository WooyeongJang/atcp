from django.urls import path
from . import views

urlpatterns = [
    path('', views.test_list, name='test_list'),  # 메인 화면
    path('find_content/', views.find_content, name='find_content')  # 검색 화면
]

