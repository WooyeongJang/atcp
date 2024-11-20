from django import forms
from .models import Test

class TestForm(forms.ModelForm):
    class Meta:
        model = Test
        fields = ['content']  # 입력받을 필드 정의
        labels = {
            'content': '내용',  # 필드 라벨 설정
        }
