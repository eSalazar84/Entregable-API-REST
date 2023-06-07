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
    btnEdit.onclick = updateOne(`${item.id}`);
    btnEdit.textContent = "Editar";
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Eliminar"
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
    document.body.appendChild(tabla);
}

const formAdd = document.getElementById("formAdd");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

formAdd.addEventListener("submit", handleSubmit);
function handleSubmit() {
    const user = new Users(name.value, email.value, phone.value);
    addOne(user);
}
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
            //Muestra el listado de todos los medidores
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
function deleteOne(user) {
    fetch(BASE_URL + `/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {
            console.log(user);
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
        .then(user => {
            generateRows(user);
        })
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


        })
        .catch(err => console.error(err));
}

getAll();

