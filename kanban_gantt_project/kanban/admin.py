from django.contrib import admin
from .models import Column, Task

@admin.register(Column)
class ColumnAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'column', 'priority', 'assigned_to', 'start_date', 'end_date']
    list_filter = ['column']
    search_fields = ['title', 'description', 'assigned_to']
