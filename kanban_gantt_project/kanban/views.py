from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import Column, Task
from rest_framework import viewsets
from .serializers import ColumnSerializer, TaskSerializer
from django.forms.models import model_to_dict
from .forms import TaskForm

#check_test(Test용)
def check_test(request):
    if request.method == "POST":
        task_id = request.POST.get('task_id')
        id = get_object_or_404(Task, id = task_id)
        return render(request, 'kanban/check_test.html', {'id': id})
    return render(request, 'kanban/check_test.html')












#Task List
def board_test_view(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            column = form.cleaned_data['column']
            column, created = Column.objects.get_or_create(name=column)
            task = form.save(commit=False)
            task.column = column
            task.save()
            return redirect('board_test_view') #저장 후 리디렉션할 URL

    else:
        form = TaskForm()

    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/board.html', {'columns': columns, 'form': form})

#Task Delete
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        task.delete()
        return redirect('board_test_view')  # 삭제 후 리디렉션할 URL
    return HttpResponse(status=405)

#Task Detail
def detail_task(request, task_id):
    # `task_id`를 기반으로 Task 객체를 가져옴, 없으면 404 에러 발생
    task = get_object_or_404(Task, id=task_id)
    return render(request, 'kanban/board.html', {'task': task})




















def board_view(request):
    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/dashboard.html')

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer