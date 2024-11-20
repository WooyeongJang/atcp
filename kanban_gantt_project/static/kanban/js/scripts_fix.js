// 모달 창 열기
function openEditModal() {
    document.getElementById('editModal').style.display = "flex";
}

// 모달 창 저장 버튼 눌렀을 때 같이 닫히기
function saveEditTask() {
    var form = document.getElementById('editTaskForm');
    form.submit();

    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// 모달 창 닫기
function closeEditModal() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}