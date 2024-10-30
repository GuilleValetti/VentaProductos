function ObtenerClientesDropDown() {
    fetch("https://localhost:7245/Clientes")
        .then(response => response.json())
        .then(data => CompletarDropdown(data))
        .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function CompletarDropdown(data) {
    let bodySelect = document.getElementById('IdCliente');
    bodySelect.innerHTML = '';

    data.forEach(element => {
        let opt = document.createElement("option");
        opt.value = element.id;
        opt.text = `${element.nombreCliente} ${element.apellidoCliente}`;
        bodySelect.add(opt);
    });
}
