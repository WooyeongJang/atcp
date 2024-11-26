document.addEventListener('DOMContentLoaded', () => {
    // `taskDetails`가 존재하면 모달 창 표시
    const taskDetails = document.getElementById('taskDetails');
    if (taskDetails) {
        document.getElementById('checkModal').style.display = 'flex';
    }
});

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


    // // 닫기 버튼을 눌렀을 때 특정 URL로 리디렉션
    // window.location.href = 'http://localhost:8000/kanban/test/';
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
    // 현재 URL에 task_id를 추가하여 페이지 새로고침
    const url = `?task_id=${taskId}`;
    window, location.href = url;
    document.getElementById('checkModal').style.display = 'flex';
}

function openEditModal() {
    document.getElementById('editModal').style.display = 'flex';
}













// Drag & Drop
function saveTasks() {
    const columns = document.querySelectorAll('.column');
    const tasks = {};

    columns.forEach(column => {
        const columnName = column.querySelector('h2').textContent;
        const columnTasks = Array.from(column.querySelectorAll('.task')).map(task => ({
            //Task번호
            id: task.id,
            //작업내용
            content: task.querySelector('.task-content').innerText,
            //담당자확인
            assignee: task.querySelector('.assignee-btn')?.innerText || '담당자 없음',
            //부서확인
            department: task.querySelector('.task-department')?.innerText || '부서 없음',  // 부서 정보 저장
        }));
        //칼럼이름을 키값으로해서 columnTasks정보를 저장한다.
        tasks[columnName] = columnTasks;
    });

    //위에 columnName을 키값으로해서 저장된 tasks를 문자열로 변환시켜 로컬스토리지(kanbanTasks)로 저장
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);

    if (event.target.classList.contains('column')) {
        event.target.appendChild(task);
    } else if (event.target.classList.contains('task') || event.target.classList.contains('task-details')) {
        event.target.closest('.column').appendChild(task);
    }

    saveTasks(); // 작업 이동 후 저장
}