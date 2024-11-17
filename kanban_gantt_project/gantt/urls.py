from django.urls import path
from . import views

urlpatterns = [
    path('', views.gantt_view, name='gantt_chart'),
]
