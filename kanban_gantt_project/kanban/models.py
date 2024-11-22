from django.db import models

class Column(models.Model):
    name = models.CharField(max_length=100)  # 칸반 컬럼 이름
    order = models.PositiveIntegerField(default=0)  # 칼럼 순서

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=255)  # 작업 제목
    description = models.TextField(blank=True, null=True)  # 작업 설명
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='tasks')  # 칸반 컬럼 연결
    priority = models.PositiveIntegerField(default=0)  # 우선순위
    assigned_to = models.CharField(max_length=100, blank=True, null=True)  # 담당자 이름
    start_date = models.DateField(null=True, blank=True)  # 작업 시작일
    end_date = models.DateField(null=True, blank=True)  # 작업 종료일
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일
    updated_at = models.DateTimeField(auto_now=True)  # 수정일

    def __str__(self):
        return self.title
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'column': self.column.id,
            'priority': self.priority,
            'assigned_to': self.assigned_to,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
