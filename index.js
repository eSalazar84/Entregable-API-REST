/* 
Trabajo práctico obligatorio. Entrega viernes 9. Crear un backend de prueba en MockAPI. Realizar el frontend de las operaciones CRUD que fueron provistas en clase (pueden usarlas, modificarlas o hacer otras distintas). 
*/

const BASE_URL = "https://647e1bf1af984710854af280.mockapi.io/users";

//traigo los ID del form en los que voy a trabajar
const tabla = document.getElementById("tabla");
const formAdd = document.getElementById("formAdd");
const title = document.getElementById("title")
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const btnSend = document.getElementById("btn-agregar");

//traigo los id para abrir y cerrar el modal para agregar o editar usuarios
const openModal = document.getElementById("open-modal-add");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

//traigo los id para abrir y cerrar el modal de busqueda
const btnModalSearch = document.getElementById("btn-modal-search");
const modalSearch = document.getElementById("modal-search");
const searchUser = document.getElementById("search");
const btnSearch = document.getElementById("formSearch");
const btnCancel = document.getElementById("close-search");


// creo la clase Users para agregar un nuevo usuario o actualizarlo
export class Users {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

//genero dinamicamente el contenido de la tabla
function generateRows(item) {
    const row = document.createElement("tr");
    const userCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.addEventListener("click", () => {
        modal.showModal();
        title.textContent = "Editar Usuario"
        btnSend.value = "Editar"
        name.value = item.name;
        email.value = item.email;
        phone.value = item.phone;
        formAdd.addEventListener("submit", () => {
            const updateUser = new Users(name.value, email.value, phone.value)
            updateOne(item.id, updateUser);
        })
    })
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar"
    btnDelete.addEventListener("click", () => {
        deleteOne(item.id);
    })
    userCell.textContent = item.name;
    emailCell.textContent = item.email;
    phoneCell.textContent = item.phone;
    editCell.appendChild(btnEdit);
    deleteCell.appendChild(btnDelete);
    row.appendChild(userCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);
    tabla.appendChild(row);
}


// creo eventos para abrir y cerrar el modal
closeModal.addEventListener("click", () => {
    modal.close();
});

openModal.addEventListener("click", () => {
    modal.showModal();
    title.textContent = "Agregar Usuario";
    btnSend.value = "Agregar"
    name.value = "";
    email.value = "";
    phone.value = "";
    formAdd.addEventListener("submit", () => {
        const user = new Users(name.value, email.value, phone.value);
        addOne(user);
    });
});

//get all resources
function getAll() {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(item => {
                generateRows(item);
            });

        })
        .catch(err => console.error(err));
}

//delete one
function deleteOne(id) {
    fetch(BASE_URL + `/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.reload()
        })
        .catch(err => console.error(err));
}

function addOne(user) {
    fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(user => generateRows(user))
        .catch(err => console.error(err));
}

function updateOne(id, user) {
    fetch(BASE_URL + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(err => console.error(err));
}

function getOne(keyword) {
    fetch(BASE_URL + `?search=${keyword}`)
        .then(res => res.json())
        .then(data => {
            tabla.innerHTML = "";
            data.forEach(item => {
                generateRows(item);
            });
        })
        .catch(err => console.error(err));
}

btnModalSearch.addEventListener("click", () => {
    modalSearch.showModal();
    btnSearch.addEventListener("click", () => {
        const keyword = searchUser.value;
        if (keyword.trim() !== "") {
            getOne(keyword);
            btnModalSearch.textContent="Cancelar Busqueda";
            btnModalSearch.addEventListener("click",()=>{
                location.reload();
            })
        }
    });
})

btnCancel.addEventListener("click", () => {
    location.reload();
});


getAll();

