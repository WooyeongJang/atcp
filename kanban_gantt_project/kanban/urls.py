from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ColumnViewSet, TaskViewSet
from . import views

router = DefaultRouter()
router.register(r'columns', ColumnViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', views.board_view, name='kanban_board'),
    path('test/', views.board_test_view, name='kanban_board_test'),
    path('edit_task/<int:task_id>/', views.edit_task, name='edit_task'),


    path('', include(router.urls)),
]