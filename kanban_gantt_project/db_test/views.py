from django.shortcuts import render, redirect, get_object_or_404
from .models import Test
from .forms import TestForm

def test_list(request):
    tests = Test.objects.all().order_by('-number')  # 모든 데이터 조회 (최신순)
    if request.method == 'POST':
        form = TestForm(request.POST)
        if form.is_valid():
            form.save()  # 데이터 저장
            return redirect('test_list')  # 동일 화면 리다이렉트
    else:
        form = TestForm()

    return render(request, 'db_test/test_list.html', {'tests': tests, 'form': form})

def find_content(request):
    if request.method == 'POST':
        number = request.POST.get('number')
        test = get_object_or_404(Test, number=number)
        return render(request, 'db_test/test_list.html', {'test': test})
    return render(request, 'db_test/test_list.html')