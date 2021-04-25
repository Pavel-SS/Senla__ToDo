function toDoStart() {
	const insert = document.querySelector('.todo__textarea'),
		list = document.querySelector('.todo__list'),
		enterValue = document.querySelector('.todo__btn');

	//загружаем данные из localStorage
	loadToDoList();

	//функция загрузки данных из localStorage
	function loadToDoList() {
		const data = localStorage.getItem('todoList');
		if (data) {
			list.innerHTML = data;
			deleteTask();
		}
	}
	

	//функция создаёт задачу
	function createTask() {
		const li = document.createElement('li'),
			task = document.createElement('p'),
			btnImport = document.createElement('input'),
			insertValue = insert.value;
		task.classList.add('todo__task');
		btnImport.classList.add('todo__btn-import');
		li.classList.add('todo__item');
		li.innerHTML = '<p class="todo__del"><img src="/icons/DeleteTrash.svg" alt="trash"></p>';
		task.prepend(insertValue);
		list.append(li);
		li.append(task);
		li.append(btnImport);
		btnImport.type = 'submit';
		btnImport.value = 'NOT IMPORT';
		insert.value = "";
		deleteTask();
	}

	//функция удаляет задачу
	function deleteTask() {
		const deleteBtn = document.querySelectorAll('.todo__del');
		deleteBtn.forEach(function (item) {
			item.addEventListener('click', function () {
				this.parentElement.remove();
			});
		});
	}


	//функция вычеркивает задачу
	function checkedTask(e) {
		if (e.target && e.target.tagName == 'P') {
			e.target.classList.toggle('checked');
		}
	}

	//функция меняет текст в кнопке (MARK IMPORT/NOT IMPORT)
	function checkedBtnImport(e) {
		if (e.target && e.target.tagName == 'INPUT') {
			e.target.classList.toggle('inport_no-metter');
			if (e.target.className === 'todo__btn-import inport_no-metter') {
				e.target.value = 'MARK IMPORT';
				e.target.id = 'on';
			} else if (e.target.className === 'todo__btn-import') {
				e.target.value = 'NOT IMPORT';
				e.target.id = 'off';
			}
		}

	}


	//обработчики

	//вычеркивает задачу по клику
	list.addEventListener('click', checkedTask);
	list.addEventListener('click', checkedBtnImport);
	//добавляет задачу по клику
	enterValue.addEventListener('click', (e) => {
		e.preventDefault();

		if (insert.value !== "") {
			createTask();
		}

	});

	//добавляет задачу при нажатии Enter
	document.addEventListener('keydown', (e) => {


		if (e.key === 'Enter' && insert.value !== '') {
			createTask();
			e.preventDefault();
		}

	});


}

toDoStart();