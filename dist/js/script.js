const insert = document.querySelector('.todo__textarea'),
    listAdd = document.querySelector('.todo__list_add'),
    listActive = document.querySelector('.todo__list_active'),
    listDone = document.querySelector('.todo__list_done'),
    enterValue = document.querySelector('.todo__btn');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
let tasksActive,
    tasksDone;

let todoItemElements = [];
//функция создания однотипных объектов массива  localStorage
function Task(description) {
    this.description = description;
    this.completed = false;
    this.star = false;
    this.crossed = false;
}
const createTamplate = (task, index) => {
    return `
        <li class="todo__item ${task.completed ? 'ckecked' :''}">
        <div onclick='crossedLine(${index})' class = "todo__item-task ${task.crossed ? 'line-checked' : ''}">
        <div class="todo__star ${task.star ? 'todo__star_on' : ''}">ffff</div>
        <p class='todo__task'>${task.description}</p>
        </div>
        <input onclick='completeTask(${index})' value = "${task.completed ? 'NOT IMPORTANT' : 'MARK IMPORTANT'}" type="submit" class="todo__btn-import ${task.completed ? 'todo__btn--no-important' : ''}" ${task.completed ? 'checked' : ''}>
        <button onclick='deleteTask(${index})' class="todo__del"></button>
        </li>
        `;
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.crossed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.crossed == true);
    tasks = [...activeTasks, ...completedTasks];
    tasksActive = [...activeTasks];
    tasksDone = [...completedTasks];
};

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
const fillHtmlList = () => {
    listAdd.innerHTML = '';
    listActive.innerHTML ='';
    listDone.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            listAdd.innerHTML += createTamplate(item, index);
        });
        tasksActive.forEach((item, index) => {
            listActive.innerHTML += createTamplate(item, index);
            updateLocal();
        });
        tasksDone.forEach((item, index) => {
            listDone.innerHTML += createTamplate(item, index);
            updateLocal();
        });
        todoItemElements = document.querySelectorAll('.todo__item');
    }
};

fillHtmlList();

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElements[index].classList.add('ckecked');
    } else {
        todoItemElements[index].classList.remove('ckecked');
    }
    tasks[index].star = !tasks[index].star;
    if (tasks[index].star) {
        todoItemElements[index].classList.add('todo__star-on');
    } else {
        todoItemElements[index].classList.remove('todo__star-on');
    }
    updateLocal();
    fillHtmlList();
};
const crossedLine = index => {
    tasks[index].crossed = !tasks[index].crossed;
    if (tasks[index].crossed) {
        todoItemElements[index].classList.add('line-checked');
    } else {
        todoItemElements[index].classList.remove('line-checked');
    }
    updateLocal();
    fillHtmlList();
};

enterValue.addEventListener('click', () => {
    tasks.push(new Task(insert.value));
    updateLocal();
    fillHtmlList();
    insert.value = '';
});

const deleteTask = index => {
    todoItemElements[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500);

};

//добавляет задачу при нажатии Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && insert.value !== '') {
        tasks.push(new Task(insert.value));
    updateLocal();
    fillHtmlList();
    insert.value = '';
    }
});

//переходы по табам
const tab = function(){
    let tabNav = document.querySelectorAll('.tab'),
    tabContent = document.querySelectorAll('.todo__main'),
    //Таб для записими активного таба
    tabName;

    tabNav.forEach(item =>{
        item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        //удаляем класс активации таба
        tabNav.forEach( item => {
            item.classList.remove('is-active');
        });
        // добавляем по клику класс активации
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }
    function selectTabContent(tabName){
        tabContent.forEach(item => {
            if(item.classList.contains(tabName)){
                item.classList.add('is-active');
            }else{
                item.classList.remove('is-active');
            }
        });
    }
};

tab();

//Поиск среди задач
window.onload = () => {
    let search = document.querySelector('#search');
    search.oninput=function(){
        let val = this.value.trim();
        let li = document.querySelectorAll('.todo__list li');
        if (val){
            li.forEach(e => {
                if(e.innerText.search(val) == -1){
                    e.classList.add('hide');
                }else{
                   e.classList.remove('hide');
                }
            });
        }
    };
};