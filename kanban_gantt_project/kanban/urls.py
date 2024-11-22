from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    # Task List, Task detail, Task Delete
    path('', views.board_view, name='kanban_board'),
    path('test/', views.board_test_view, name='board_test_view'),
    path('delete_task/<int:task_id>/', views.delete_task, name='delete_task'),
]