from django.shortcuts import render
from kanban.models import Task

def gantt_view(request):
    tasks = Task.objects.all().order_by('start_date')
    return render(request, 'gantt/chart.html', {'tasks': tasks})
