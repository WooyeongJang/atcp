from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('kanban.urls')),
    path('kanban/', include('kanban.urls')),  # 칸반보드 URL
    path('gantt/', include('gantt.urls')),   # 간트차트 URL
    path('db_test/', include('db_test.urls'))
]
