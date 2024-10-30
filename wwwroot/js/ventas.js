function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

// function MostrarVentas(data) {
//     $("#todasLasVentas").empty();
    
//     $.each(data, function(index, item) {
//         var date = new Date(item.fechaVenta);
        
//         $('#todosLosVehiculos').append(
//             "<tr>",
//             "<td>" + item.id + "</td>",
//             "<td>" + date.toLocaleString() + "</td>",
//             "<td>" + item.finalizada + "</td>",
//             "<td>" + item.cliente.id + "</td>",
//             "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
//             "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
//             "</tr>"
//         )
//     })
// }

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    
    $.each(data, function(index, item) {
        var date = new Date(item.fechaVenta);
        
        $('#todasLasVentas').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.cliente.nombreCliente + " " + item.cliente.apellidoCliente + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        );
    });
}

function CrearVenta() {
    let idcliente = document.getElementById('IdCliente').value;
    let venta = {
        fechaVenta: document.getElementById("FechaVenta").value,
        finalizada: document.getElementById("Finalizada").checked,
        idCliente: idcliente,
        cliente: {
            nombreCliente: document.getElementById("NombreCliente").value,
            apellidoCliente: document.getElementById("ApellidoCliente").value
        },
        detalleVenta: null
    };

    fetch('https://localhost:7245/Ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venta)
    })
    //.then(response => response.json())
    .then(data => {
        if (data.status == undefined) {
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").checked = false;
            document.getElementById("IdCliente").value = 0;
            document.getElementById("NombreCliente").value = "";
            document.getElementById("ApellidoCliente").value = "";

            $('#error').empty();
            $('#error').attr("hidden", true);
            $('#modalAgregarVentas').modal('hide');
            ObtenerVentas();
        } else {
            mensajeerror('#error', data);
        }
    })
    .catch(error => console.log("Hubo un error al agregar una Venta, verifique el mensaje de error:", error));
}

function EliminarVenta(id) {
    var eliminarVentaSi = confirm("¿Esta seguro de borrar esta Venta?")
    if (eliminarVentaSi == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
        {
            method: "DELETE"
        })
        .then(() => {
            ObtenerVentas();
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}
