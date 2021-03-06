//Aqui es donde debemos poblar la tabla desde
// la base de datos de postgres y dejarla en "data"
// para poblar la variable "tableData"
var tableData;
d3.json("/api_data").then(d=>{
    tableData = d
    autoPopulate(tableData)
    console.log(tableData);
});

//Aqui capturamos los valores que se eligieron en cada combo
var f_date = d3.select("#Date");
var t_date = d3.select("#Date");
var f_province = d3.select("#GEO");
var f_pvectype = d3.select("#Vehicle_type");
var f_orman = d3.select("#O_manu");
var f_sales_dlls = d3.select("#Sales_dollars");
var f_sales_units = d3.select("#Sales_units");



// Aqui guardamos el click del boton de "Submit"
var submit = d3.select("#filter-btn");

// Aqui guardamos la estructura del cuerpo de la tabla
// que vamos a poblar en la sección "tbody" del "index.html"
var tbody = d3.select("tbody");

// Aqui definimos el con los datos de la tabla "console.log"
// console.log(tableData);
// autoPopulate(tableData);

//Poblamos por default la tabla con los valores que existen en la tabla
function autoPopulate(tableData) 
{
    tableData.forEach((vehicles) => 
    {
        var row = tbody.append("tr");
        Object.entries(vehicles).forEach(([key, value]) => 
        {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}


// Aqui esta lo que debe hacer el botton submit
submit.on("click", function() 
{
        // Limpa el espacio de la tabla
        d3.event.preventDefault();
        tbody.html("");
        // Filtramos los datos que cumplan con los filtros elegidos
        var filteredData = tableData.filter(vehicles => 
            vehicles.f_year >= f_year && 
            vehicles.f_date >= f_date &&
            vehicles.t_date <= t_date &&
            vehicles.f_province == f_province &&
            vehicles.f_pvectype == f_pvectype &&
            vehicles.f_orman == f_orman);

        // SI no hay registros enviamos un mensaje y poblamos la tabla con todos los datos
        if (filteredData.length == 0) 
        {
            alert("No information found, please try another filter value!");
            autoPopulate(tableData);
        }
        console.log(filteredData);
        
        // En caso de que si haya datos pobla la tabla con los datos filtrados
        filteredData.forEach((vehicles) =>
        { 
            var row = tbody.append("tr");
            Object.entries(vehicles).forEach(([key, value]) => 
            {
                var cell = row.append("td");
                cell.text(value);
            });
        });

})


