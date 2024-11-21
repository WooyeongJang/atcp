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
        fields = ['title', 'description', 'column', 'priority', 'assigned_to', 'start_date', 'end_date']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }