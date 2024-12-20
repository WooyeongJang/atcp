let taskIdCounter = 4;
let currentTaskId = null;  // 현재 편집 중인 작업 ID를 저장

// 로컬 스토리지에 작업을 저장하는 함수
// 태그가 column의 클래스를 가진 HTML요소를 가져와서 columns 객체로 만든다.
// task의 정보를 담기 위해 빈 객체를 생성한다.
// forEach로 모든 columns의 개수만큼 순회하면서 columnNamem columnTasks등 정보를 수집힌다.
// columnName은 column의 클래스를 가진 HTML요소에서 h2태그 안의 textContent의 집합
// columnTasks는 task의 클래스를 가진 HTML요소를 가져와 배열로 변환한 뒤 각 정보를 객체로 변환한다.
// ex) columnTasks = {'To do', 'task4', '', '담담자 없음', '부서 없음'}
// 객체로 변환된 정보를 키값(columnName)으로해서 columnTasks정보로 저장한다.
// 키값으로 저장된 tasks를 로컬스토리지에(kanbanTasks)에 저장(로컬스토리지는 문자열로 변환해야한다.)
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


// 로컬 스토리지에서 작업 불러오기
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('kanbanTasks'));

    if (storedTasks) {
        Object.keys(storedTasks).forEach(columnName => {
            const column = Array.from(document.querySelectorAll('.column')).find(col => col.querySelector('h2').textContent === columnName);

            if (column) {
                column.querySelectorAll('.task').forEach(task => task.remove());

                storedTasks[columnName].forEach(taskData => {
                    createTaskElement(column, taskData.id, taskData.content, taskData.assignee);
                });
            }
        });
    }
}

// 새 작업 요소를 생성하는 함수
function createTaskElement(column, taskId, content, assignee, department) {
    const task = document.createElement('div');
    task.className = 'task';
    task.id = taskId;
    task.draggable = true;
    task.ondragstart = drag;

    task.innerHTML = `
        <span class="task-content" onclick="openEditModal('${taskId}')">${content}</span>
        <div class="task-controls">
            <button class="edit-btn" onclick="openEditModal('${taskId}')">edit</button>
            <button class="delete-btn" onclick="deleteTask('${taskId}')">x</button>
        </div>
        <div class="task-details">
            <span class="task-icons">
                <button class="icon-email"><i class="fas fa-envelope"></i></button>
                <button class="icon-share"><i class="fas fa-share-alt"></i></button>
            </span>
            <!-- 부서 정보를 담당자보다 위로 배치 -->
            <span class="task-department">${department}</span>
            <button class="assignee-btn blue">${assignee}</button>
        </div>
    `;
    column.appendChild(task);
}



// 페이지 로드 시 작업을 로드
window.onload = loadTasks;

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

// 작업 추가 함수
// column 클래스를 가진 모든 HTML요소를 columns 객체로 만든다. 빈 객체 column 생성.
// column을 forEach문을 통해 columns의 객체 갯수만큼 순회한다. 입력된 columName과 columns의 객체 정보와
// 같을 경우 빈 column 객체는 순회하는 col 값이 된다.
// 이제 column 값이 정해진다면 taskId = taskIdCounter(증가)가 된다. 그리고 createTaskElement의 매개변수로 들어감.
// 마지막으로 task가 저장된다.
function addTask(columnName) {
    const columns = document.querySelectorAll('.column');
    let column;

    columns.forEach(col => {
        if (col.querySelector('h2').textContent === columnName) {
            column = col;
        }
    });

    if (column) {
        const taskId = `task${taskIdCounter++}`;
        // '새 작업', '담당자 없음', '부서 없음'으로 초기화하여 작업 생성
        createTaskElement(column, taskId, '새 작업', '담당자 없음', '부서 없음');
        //createTaskElement(column, 4, content='새 작업', assignee='담당자 없음', department='부서 없음')
        saveTasks(); // 작업 추가 후 저장
    }
}


// 모달 창 열기 (편집)
// taskId 값을 매개변수로 해서 들어오면 현재 작업중인 currentTaskId = taskId로 변경
// 각각의 클래스 가진 HTML요소의 text값을 가져와서 새로운 객체에 저장한다. 그리고 이 객체는 모달창의
// id값을 통해 value으로 만들어진다. 
function openEditModal(taskId) {
    currentTaskId = taskId;  // 현재 편집 중인 작업 ID 설정
    const taskElement = document.getElementById(taskId);
    const taskContent = taskElement.querySelector('.task-content').innerText;
    const taskAssignee = taskElement.querySelector('.assignee-btn').innerText;    
    const taskDepartment = taskElement.querySelector('.task-department')?.innerText || '부서 없음';

    document.getElementById('editTaskContent').value = taskContent;
    document.getElementById('editTaskAssignee').value = taskAssignee;
    document.getElementById('editTaskDepartment').value = taskDepartment;  // 부서 정보 설정

    const modal = document.getElementById('editModal');
    modal.style.display = 'flex';  // 모달을 화면 중앙에 표시
}



// 모달 창 닫기
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';  // 모달을 닫음
    currentTaskId = null;
}


// 모달 창에서 편집한 내용 저장
function saveEditTask() {
    const newTaskContent = document.getElementById('editTaskContent').value;
    const newTaskAssignee = document.getElementById('editTaskAssignee').value;
    const newTaskDepartment = document.getElementById('editTaskDepartment').value; 

    if (currentTaskId) {
        const taskElement = document.getElementById(currentTaskId);
        taskElement.querySelector('.task-content').innerText = newTaskContent;
        taskElement.querySelector('.assignee-btn').innerText = newTaskAssignee;
        // 부서 정보가 존재하지 않으면 새롭게 추가
        let departmentElement = taskElement.querySelector('.task-department');
        if (!departmentElement) {
            departmentElement = document.createElement('span');
            departmentElement.className = 'task-department';
            taskElement.querySelector('.task-details').appendChild(departmentElement);
        }
        departmentElement.innerText = newTaskDepartment;  // 부서 정보 업데이트

        saveTasks();  // 편집 후 저장
        closeEditModal();  // 모달 닫기
    }
}

// 작업 삭제 함수
function deleteTask(taskId) {
    const taskElement = document.getElementById(taskId);
    taskElement.remove();
    saveTasks(); // 삭제 후 저장
}


// 페이지 로드 시 모달 창을 숨기기
window.onload = function() {
    closeEditModal();  // 모달 창을 기본적으로 숨긴 상태로 초기화
    loadTasks();  // 기존 작업 불러오기
};

// CSV 파일로 작업 저장
function saveTasksToCSV() {
    const columns = document.querySelectorAll('.column');
    let csvContent = "data:text/csv;charset=utf-8,";

    // CSV 헤더 추가
    csvContent += "ID,Content,Assignee,Department,Column\n";

    // 각 작업 데이터 가져오기
    columns.forEach(column => {
        const columnName = column.querySelector('h2').textContent;
        const columnTasks = Array.from(column.querySelectorAll('.task'));

        columnTasks.forEach(task => {
            const taskId = task.id;
            const taskContent = task.querySelector('.task-content').innerText;
            const taskAssignee = task.querySelector('.assignee-btn')?.innerText || '담당자 없음';
            const taskDepartment = task.querySelector('.task-department')?.innerText || '부서 없음';
            
            // CSV 내용 추가
            csvContent += `${taskId},${taskContent},${taskAssignee},${taskDepartment},${columnName}\n`;
        });
    });

    // CSV 파일 다운로드 링크 생성
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "task.csv");
    document.body.appendChild(link);

    link.click();  // 파일 다운로드 실행
    document.body.removeChild(link);  // 링크 제거
}



// CSV 파일 불러오기
function loadTasksFromCSV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                parseCSVAndLoadTasks(csvData);
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// CSV 데이터 파싱 및 작업 생성
function parseCSVAndLoadTasks(csvData) {
    const rows = csvData.split('\n');
    const header = rows.shift(); // 첫 번째 줄은 헤더
    const columns = document.querySelectorAll('.column');

    // 각 컬럼의 작업을 지우고 새로 로드
    columns.forEach(column => column.querySelectorAll('.task').forEach(task => task.remove()));

    rows.forEach(row => {
        const [id, content, assignee, department, columnName] = row.split(',');

        const column = Array.from(columns).find(col => col.querySelector('h2').textContent === columnName.trim());
        if (column) {
            createTaskElement(column, id, content, assignee, department);
        }
    });

    saveTasks(); // 로컬 스토리지에도 저장
}