document.addEventListener('DOMContentLoaded', () => {
    const entrada = document.getElementById('novatarefa');
    const btn = document.getElementById('add-tarefa-btn');
    const filtrobtns = document.querySelectorAll('.filtro-btn');
    const listadetarefas = document.querySelector('.lista-de-tarefas');

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let filtro = 'todas';

    const salvarTarefas = () => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    };

    const renderTarefas = () => {
        listadetarefas.innerHTML = '';
        let tarefasFiltradas = tarefas.filter(tarefa => {
            if (filtro === 'todas') return true;
            if (filtro === 'pendentes') return !tarefa.completed;
            if (filtro === 'completas') return tarefa.completed;
        });
        tarefasFiltradas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.className = tarefa.completed ? 'completa' : '';
            li.innerHTML = `
                <span>${tarefa.title}</span>
                <div>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                    <button class="toggle-btn">${tarefa.completed ? 'Desmarcar' : 'Concluir'}</button>
                </div>`;
            listadetarefas.appendChild(li);

            li.querySelector('.edit-btn').addEventListener('click', () => editTarefa(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTarefa(index));
            li.querySelector('.toggle-btn').addEventListener('click', () => toggleComplete(index));
        });
    };

    const addTarefa = (title) => {
        tarefas.push({ title, completed: false });
        salvarTarefas();
        renderTarefas();
    };

    const editTarefa = (index) => {
        const newTitle = prompt('Editar Tarefa', tarefas[index].title);
        if (newTitle) {
            tarefas[index].title = newTitle;
            salvarTarefas();
            renderTarefas();
        }
    };

    const deleteTarefa = (index) => {
        tarefas.splice(index, 1);
        salvarTarefas();
        renderTarefas();
    };

    const toggleComplete = (index) => {
        tarefas[index].completed = !tarefas[index].completed;
        salvarTarefas();
        renderTarefas();
    };

    btn.addEventListener('click', () => {
        const taskTitle = entrada.value.trim();
        if (taskTitle) {
            addTarefa(taskTitle);
            entrada.value = '';
        }
    });

    entrada.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskTitle = entrada.value.trim();
            if (taskTitle) {
                addTarefa(taskTitle);
                entrada.value = '';
            }
        }
    });

    filtrobtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtrobtns.forEach(b => b.classList.remove('ativar'));
            btn.classList.add('ativar');
            filtro = btn.dataset.filter;
            renderTarefas();
        });
    });

    renderTarefas();
});
