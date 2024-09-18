function ObtenerClientes() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => MostrarClientes(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarClientes(data) {
    let tbody = document.getElementById('todosLosClientes');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdNombreCliente = document.createTextNode(element.nombreCliente);
        td1.appendChild(tdNombreCliente);

        let td2 = tr.insertCell(2);
        let tdApellidoCliente = document.createTextNode(element.apellidoCliente);
        td2.appendChild(tdApellidoCliente);

        let td3 = tr.insertCell(3);
        let tdDni = document.createTextNode(element.dni);
        td3.appendChild(tdDni);

        let td4 = tr.insertCell(4);
        let tdSaldo = document.createTextNode(element.saldo);
        td4.appendChild(tdSaldo);

        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarClienteId(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarCliente(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnEliminar);
    });
}

function CrearCliente() {
    var cliente = document.getElementById("NombreCliente").value;
    if (cliente == "" || cliente == null) {
         return mensajesError('#error', null, "Por favor ingrese un Nombre para el Producto.");
    }

    let cliente = {
        nombreCliente: document.getElementById("NombreCliente").value,
        apellidoCliente: document.getElementById("ApellidoCliente").value,
        dni: document.getElementById("Dni").value,
        saldo: document.getElementById("Saldo").value,
    };

    fetch('https://localhost:7245/Clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cliente)
        }
    )
    .then(response => response.json())
    .then(data =>{
         if(data.status == undefined){
            document.getElementById("NombreCliente").value = "",
            document.getElementById("ApellidoCliente").value = "";
            document.getElementById("Dni").value = 0;
            document.getElementById("Saldo").value = 0;

            $('#modalAgregarClientes').modal('hide');
            ObtenerClientes();
         } else {
             mensajesError('#error', data);
         }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Cliente nuevo, verifique el mensaje de error: ", error))
}

function EliminarCliente(id) {
    var siElimina = confirm("¿Esta seguro de borrar este producto?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function BuscarClienteId(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdCliente").value = data.id;
        document.getElementById("NombreClienteEditar").value = data.nombreCliente;
        document.getElementById("ApellidoClienteEditar").value = data.apellidoCliente;
        document.getElementById("DniEditar").value = data.dni;
        document.getElementById("SaldoEditar").value = data.saldo;

        $('#modalEditarClientes').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}

function EditarCliente() {
    let idCliente = document.getElementById("IdCliente").value;

    let editarCliente = {
        id: idCliente,
        nombreCliente: document.getElementById("NombreClienteEditar").value,
        apellidoCliente: document.getElementById("ApellidoClienteEditar").value,
        dni: document.getElementById("DniEditar").value,
        saldo: document.getElementById("SaldoEditar").value
    }

    fetch(`https://localhost:7245/Clientes/${idCliente}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarCliente)
    })
    .then(data => {

            document.getElementById("IdCliente").value = 0;
            document.getElementById("NombreClienteEditar").value = "";
            document.getElementById("ApellidoClienteEditar").value = "";
            document.getElementById("DniEditar").value = 0;
            document.getElementById("SaldoEditar").value = 0;
            $('#modalEditarClientes').modal('hide');
            ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
   
    $(id).attr("hidden", false);
}