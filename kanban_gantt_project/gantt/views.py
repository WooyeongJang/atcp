from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from kanban.models import Task
import json

def gantt_view(request):
    tasks = Task.objects.all().order_by('start_date')

    # 전체 기간 계산
    start_year = min(task.start_date.year for task in tasks if task.start_date)
    end_year = max(task.end_date.year for task in tasks if task.end_date)

    # 연도 범위 생성
    years = list(range(start_year, end_year + 1))

    # 총 월수 계산
    total_months = (end_year - start_year + 1) * 12

    # 작업 데이터를 가공
    processed_tasks = []
    for task in tasks:
        if task.start_date and task.end_date:
            duration_months = (task.end_date.year - task.start_date.year) * 12 + (task.end_date.month - task.start_date.month + 1)
            start_offset = (task.start_date.year - start_year) * 12 + (task.start_date.month - 1)  # 시작 위치 계산
            processed_tasks.append({
                'id': task.id,
                'title': task.title,
                'assigned_to': task.assigned_to,
                'start_offset': start_offset,
                'duration_months': duration_months,
            })

    return render(request, 'gantt/chart.html', {
        'tasks': processed_tasks,
        'years': years,
        'total_months': total_months,
    })