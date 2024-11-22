// 모달 창 열기
function openEditModal() {
    document.getElementById('editModal').style.display = "flex";
}
// 모달 창 닫기(closeModal로 통일)
function closeModal() {
    var modal_edit = document.getElementById('editModal');
    var modal_check = document.getElementById('checkModal');
    modal_edit.style.display = 'none';
    modal_check.style.display = 'none';
}




// Task Save
function saveEditTask() {
    var form = document.getElementById('editTaskForm');
    form.submit();

    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Task Delete
function deleteEditTask() {
    var form = document.getElementById('deleteTaskForm');
    form.submit();
}

// Task Detail Modal
function openDetailModal(taskId) {
    document.getElementById('checkModal').style.display = 'flex';
    console.log("Clicked Task ID:", taskId);
}
