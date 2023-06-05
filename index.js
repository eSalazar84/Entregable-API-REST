/* 
Trabajo práctico obligatorio. Entrega viernes 9. 
Crear un backend de prueba en MockAPI. 
Realizar el frontend de las operaciones CRUD que fueron provistas en clase 
(pueden usarlas, modificarlas o hacer otras distintas).
*/


//Toma los datos cargados en el form 

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
function handleSubmit() {
    const user = new FormData(form);
    console.log(user.get("nombre"));
}

//Abre y cierra el modal para agregar un nuevo medidor
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
closeModal.addEventListener("click", () => {
    modal.close();
});
openModal.addEventListener("click", () => {
    modal.showModal();
});

const BASE_URL = "https://647e1bf1af984710854af280.mockapi.io/users";
//get all resources
function getAll() {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //Muestra el listado de todos los medidores
            const tabla = document.getElementById("tabla");
            data.forEach(item => {
                const row = document.createElement("tr");
                const userCell = document.createElement("td");
                const emailCell = document.createElement("td");
                const phoneCell = document.createElement("td");
                const editCell = document.createElement("td");
                const deleteCell = document.createElement("td");
                const btnEdit = document.createElement("a");
                btnEdit.textContent = "Editar Usuario";
                const btnDelete = document.createElement("a");
                btnDelete.textContent = "Eliminar Usuario"
                userCell.textContent = item.name;
                emailCell.textContent = item.email;
                phoneCell.textContent = item.phone;
                editCell.appendChild(btnEdit);
                deleteCell.appendChild(btnDelete);
                row.appendChild(userCell);
                row.appendChild(emailCell);
                row.appendChild(editCell);
                row.appendChild(deleteCell);
                tabla.appendChild(row);
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
        .then(data => console.log(data))
        .catch(err => console.error(err));
}
//add a new resource
const newUser = {
    name: "Jorge 'el profe' Sardón",
    email: "giorgioDJ@dero.com",
    phone: "(2314) 232323223",
};

function addOne(user) {
    fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
}
//edit a new resource
const updatedUser = {
    name: "Jorge 'el profe' Sardón",
    email: "giorgioDJ@dero.com",
    phone: "(2314) 232323223",
};
function updateOne(id, user) {
    fetch(BASE_URL + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

getAll()