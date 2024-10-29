function ObtenerVentas() {
    fetch('https://localhost:7245/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    
    $.each(data, function(index, item) {
        var date = new Date(item.fechaVenta);
        
        $('#todosLosVehiculos').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + date.toLocaleString() + "</td>",
            "<td>" + item.finalizada + "</td>",
            "<td>" + item.cliente.id + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        )
    })
}