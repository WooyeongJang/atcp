from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('kanban/', include('kanban.urls')),  # 칸반보드 URL
    path('gantt/', include('gantt.urls')),   # 간트차트 URL
]
