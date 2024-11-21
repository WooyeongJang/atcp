// 모달 창 열기
function openEditModal() {
    document.getElementById('editModal').style.display = "flex";
}
// 모달 창 닫기
function closeEditModal() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}




// Task Save
function saveEditTask() {
    var form = document.getElementById('editTaskForm');
    form.submit();

    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Task Edit
function openEditTask() {
    var modal = document.getElementById('editModal');
    modal.style.display = 'none';
}


// Task Delete
function deleteEditTask() {
    var form = document.getElementById('deleteTaskForm');
    form.submit();
}







function openCheckModal(taskId) {
    // 클릭된 작업의 데이터를 폼에 채우기
    const taskElement = document.querySelector(`#task-${taskId}`);
    if (taskElement) {
        document.getElementById('checkTaskTitle').value = taskElement.querySelector('.task-content').innerText;
        document.getElementById('checkTaskDescription').value = taskElement.dataset.description || '';
        document.getElementById('checkTaskColumn').value = taskElement.dataset.column || '';
        document.getElementById('checkTaskPriority').value = taskElement.dataset.priority || '';
        document.getElementById('checkTaskAssignedTo').value = taskElement.dataset.assignedTo || '';
        document.getElementById('checkTaskStartDate').value = taskElement.dataset.startDate || '';
        document.getElementById('checkTaskEndDate').value = taskElement.dataset.endDate || '';

        // 모달 표시
        document.getElementById('checkModal').style.display = 'block';
    } else {
        alert('작업 데이터를 찾을 수 없습니다.');
    }
}

// 모달 닫기
function closeCheckModal() {
    document.getElementById('checkModal').style.display = 'none';
}