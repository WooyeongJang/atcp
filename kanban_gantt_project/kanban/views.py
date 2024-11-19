from django.shortcuts import render
from .models import Column, Task

def board_view(request):
    columns = Column.objects.prefetch_related('tasks').all().order_by('order')
    return render(request, 'kanban/board.html')


