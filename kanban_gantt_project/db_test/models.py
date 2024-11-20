from django.db import models

class Test(models.Model):
    number = models.AutoField(primary_key=True)  # 순번 (자동 증가)
    content = models.TextField()  # 내용

    def __str__(self):
        return f"{self.number}: {self.content[:20]}"  # 순번과 내용 일부 표시
