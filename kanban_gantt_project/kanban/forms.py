from django import forms
from .models import Column, Task

class ColumnForm(forms.ModelForm):
    class Meta:
        model = Column
        fields = ['name', 'order']

class TaskForm(forms.ModelForm):
    column = forms.ModelChoiceField(queryset=Column.objects.all(), required=True)

    class Meta:
        model = Task
        fields = ['description', 'column']  # 'name' 필드를 제거하고 올바른 필드 이름을 사용