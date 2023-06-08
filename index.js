/* 
Trabajo práctico obligatorio. Entrega viernes 9. 
Crear un backend de prueba en MockAPI. 
Realizar el frontend de las operaciones CRUD que fueron provistas en clase 
(pueden usarlas, modificarlas o hacer otras distintas).
*/

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
        modalEdit.showModal();
        console.log("hola?");
        nameEdit.value = item.name;
        emailEdit.value= item.email;
        phoneEdit.value=item.phone;
        formAddEdit.addEventListener("submit",()=>{
            const updateUser = new Users(nameEdit.value,emailEdit.value,phoneEdit.value)
            updateOne(item.id,updateUser);
            
        })
    })
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar"
    btnDelete.addEventListener("click", () => {
        console.log("entra aca");
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

const formAdd = document.getElementById("formAdd");
const title = document.getElementById("title")
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

formAdd.addEventListener("submit", () => {
    const user = new Users(name.value, email.value, phone.value);
    addOne(user);
});

//Abre y cierra el modal
const openModal = document.getElementById("open-modal-add");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
    modal.close();
});
openModal.addEventListener("click", () => {
    modal.showModal();
});

const BASE_URL = "https://647e1bf1af984710854af280.mockapi.io/users";
const tabla = document.getElementById("tabla");
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


//get resource by id
function getOne(id) {
    fetch(BASE_URL + `/${id}`)
        .then(res => res.json())
        .then(data => console.log(data))
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

const modalEdit = document.getElementById("modal-edit");
const nameEdit = document.getElementById("name-edit");
const emailEdit = document.getElementById("email-edit");
const phoneEdit = document.getElementById("phone-edit");
const closeModalEdit = document.getElementById("close-modal-edit");
const formAddEdit = document.getElementById("formAdd-edit")


closeModalEdit.addEventListener("click", () => {
    modalEdit.close();
});

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



getAll();

