from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ColumnViewSet, TaskViewSet
from . import views

router = DefaultRouter()
router.register(r'columns', ColumnViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('', views.board_view, name='kanban_board'),
    path('test/', views.board_test_view, name='board_test_view'),


    path('', include(router.urls)),


    # delete task, detail task
    path('delete_task/<int:task_id>/', views.delete_task, name='delete_task'),
    path('detail_task/<int:task_id>/', views.detail_task, name='detail_task'),






    #check_test view(Test용)
    path('check_test/', views.check_test, name='check_test'),
]