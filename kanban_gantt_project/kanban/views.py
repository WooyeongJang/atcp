from django.shortcuts import render, redirect
from .models import Column, Task
from rest_framework import viewsets
from .serializers import ColumnSerializer, TaskSerializer
from .forms import TaskForm


#test code
def board_test_view(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            column = form.cleaned_data['column']
            column, created = Column.objects.get_or_create(name=column)
            task = form.save(commit=False)
            task.column = column
            task.save()
            return redirect('board_test_view')

    else:
        form = TaskForm()

    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/board.html', {'columns': columns, 'form': form})


def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            column_name = form.cleaned_data['column']
            column, created = Column.objects.get_or_create(name=column_name)
            task = form.save(commit=False)
            task.column = column
            task.save()
            return redirect('board_test_view')
    else:
        form = TaskForm(instance=task)
    
    return render(request, 'edit_task.html', {'form': form})

















def board_view(request):
    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/dashboard.html')

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer