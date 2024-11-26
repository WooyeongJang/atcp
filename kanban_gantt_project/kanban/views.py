from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import Column, Task
from rest_framework import viewsets
from .serializers import ColumnSerializer, TaskSerializer
from .forms import TaskForm

#Task List, Task detail
def board_test_view(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            column = form.cleaned_data['column']
            task = form.save(commit=False)
            task.column = column
            task.save()
            return redirect('board_test_view') #저장 후 리디렉션할 URL

    else:
        form = TaskForm()

    # task 초기화
    task = None  # 기본값 설정

    task_id = request.GET.get('task_id')
    if task_id and task_id.isdigit():
        task = get_object_or_404(Task, id=task_id)

    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/board.html', {'columns': columns, 'form': form, 'task': task})


#Task Delete
def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        task.delete()
        return redirect('board_test_view')  # 삭제 후 리디렉션할 URL
    return HttpResponse(status=405)


def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Task updated successfully!'})
    else:
        form = TaskForm(instance=task)
    return JsonResponse({'error': 'Invalid request!'})

















def board_view(request):
    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/dashboard.html')

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer