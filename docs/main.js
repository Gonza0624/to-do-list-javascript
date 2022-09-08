const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const vacio = document.querySelector(".vacio");
const borrarTodo = document.querySelector(".borrarTodo");
const btnBorrar = document.querySelector(".btn-delete");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    guardarLocalStorage(text);

    msjConfirmacion();

    input.value = "";
    vacio.style.display = "none";
  }
});

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "x";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
      swal({
        title: "Estas seguro de eliminar?",
        text: "no se podra recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const item = e.target.parentElement;
            ul.removeChild(item);

            const items = document.querySelectorAll("li");

            borrarLocalTodos(item);

            if (items.length === 0) {
              vacio.style.display = "block";
            }
            swal("La tarea se ha borrado", {
              icon: "success",
            });
          } else {
            swal("Proceso cancelado");
          }
        });
    }

  );

  return deleteBtn;
}

borrarTodo.addEventListener("click", (e) => {
  clearStorage();
  const ul = document.querySelector("ul");
  let lis = ul.children;
  for (let i = 0; i < lis.length; i++) {
    while (lis[i]) {
      ul.removeChild(lis[i])
    }
  }

  const items = document.querySelectorAll("li");

  alert('Se borro todo del localstorage')

  if (items.length === 0) {
    vacio.style.display = "block";
  }
});

// agregar al localstorage
function guardarLocalStorage(todo) {
  let todos;

  if (localStorage.getItem("tareas") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("tareas"));
  }

  todos.push(todo);
  localStorage.setItem("tareas", JSON.stringify(todos));
}

// eliminar del localstorage
function borrarLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// eliminar todo al mismo tiempo del localstorage
function clearStorage() {
  localStorage.clear();
}

function msjConfirmacion() {
  swal({
    title: "Tarea agregada correctamente!",
    text: `${JSON.stringify(window.localStorage)}`,
    icon: "success",
    dangerMode: true,
  });

}






