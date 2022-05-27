const marcas = ["APPLE", "XIAOMI", "SAMSUNG", "LG", "DESCONOCIDA"];



class PHONE{
    constructor(model, brand="DESCONOCIDA", price=0){
        this.model = model.toUpperCase();
        this.brand = brand.toUpperCase();
        if(isNaN(price)){
            this.price = 0;
        }else{
            this.price = price;
        }
        
    }
    presupuestarArreglo(problema){
        //el costo del arreglo es proporcional al costo del producto a arreglar
        problema = problema.toLowerCase();
        const tarifas = [{arreglo:"pantalla", costo:0.5},
                        {arreglo:"puerto_de_carga", costo:0.020},
                        {arreglo:"bateria", costo:0.1},
                        {arreglo:"sin_señal", costo: 0.3},
                        {arreglo:"software", costo: 0.15}];
        const tarifaProblema = tarifas.find(element => element.arreglo == problema);
        if (tarifaProblema == undefined){
            return -1; //error al ingresar problema
        }
        return (this.price * tarifaProblema.costo);
    }
}

class FACTURA{
    constructor(phone=null, budget=-1, shipping=-1, department=null){
        this.repair = {
            model: null,
            cost: budget
        }
        if(phone != null){
            this.repair.model = phone.model;
        }
        this.shipping = {
            place: department,
            cost: shipping
        }
    }
    mostrarFactura(){
        //Mostraré el resultado en un div nuevo dentro del form
        //tambien muestra coste de envío
        const resultID = "form__result";
        let resultado = document.getElementById(resultID);
        if (resultado != null){
            resultado.remove();
        }
        let formulario = document.getElementsByTagName("form")[0];
        resultado = document.createElement("div");
        resultado.id= resultID;
        resultado.innerHTML = 
            `<h3>Resultado de la estimación</h3>
            <div>Reparar su ${this.repair.model} costaría ${this.repair.cost} dolares</div>`;
        if(this.shipping.cost>0){
            resultado.innerHTML = resultado.innerHTML.concat(
                `<div>Su envío a ${this.shipping.place} costaría ${this.shipping.cost} dolares</div>`
            )
        }
        else if (this.shipping.cost==0){
            resultado.innerHTML = resultado.innerHTML.concat(
                `<div>Su envío a ${this.shipping.place} es gratis</div>`
            )
        }
        formulario.appendChild(resultado);
    
        formulario.querySelector("h3").style.fontSize = "16px";
        formulario.querySelectorAll("div").forEach((asd) =>{
            asd.style.fontSize = "14px";
            asd.style.display = "block";
        });
        return;
    }

}

//sigo usando arreglos como bases de datos precarias
const phoneStock = [
    (new PHONE("redmi_note_10", "xiaomi", 500)),
    (new PHONE("redmi_note_9", "xiaomi", 400)),
    (new PHONE("redmi_note_8", "xiaomi", 300)),
    (new PHONE("redmi_note_7", "xiaomi", 200)),
    (new PHONE("iphone_10", "apple", 1000)),
    (new PHONE("iphone_9", "apple", 900)),
    (new PHONE("iphone_8", "apple", 800)),
    (new PHONE("iphone_7", "apple", 700)),
    (new PHONE("iphone_6", "apple", 600)),
    (new PHONE("galaxy_10", "samsung", 950)),
    (new PHONE("galaxy_9", "samsung", 850)),
    (new PHONE("galaxy_8", "samsung", 750)),
    (new PHONE("galaxy_7", "samsung", 650)),
    (new PHONE("galaxy_6", "samsung", 550)),
    (new PHONE("nexus_10", "lg", 800)),
    (new PHONE("nexus_9", "lg", 720)),
    (new PHONE("nexus_8", "lg", 680)),
    (new PHONE("nexus_7", "lg", 560)),
    (new PHONE("nexus_6", "lg", 250))
];


const coveredDepartment = [
    {name:"Montevideo",     ticketLevel: 0},
    {name:"Canelones",      ticketLevel: 1},
    {name:"Maldonado",      ticketLevel: 1},
    {name:"Florida",        ticketLevel: 1},
    {name:"Lavalleja",      ticketLevel: 1},
    {name:"San José",       ticketLevel: 1},
    {name:"Colonia",        ticketLevel: 2},
    {name:"Cerro Largo",    ticketLevel: 2},
    {name:"Soriano",        ticketLevel: 2},
    {name:"Rocha",          ticketLevel: 2},
    {name:"Durazno",        ticketLevel: 2},
    {name:"Treinta y Tres", ticketLevel: 2},
    {name:"Flores",         ticketLevel: 2},
    {name:"Tacuarembó",     ticketLevel: 3},
    {name:"Paysandú",       ticketLevel: 3},
    {name:"Río Negro",      ticketLevel: 3},
    {name:"Rivera",         ticketLevel: 3},
    {name:"Salto",          ticketLevel: 3},
    {name:"Artigas",        ticketLevel: 3}
];
const coveredNeighborhood = [
    {name:"Centro",         ticketLevel: 0},
    {name:"Ciudad Vieja",   ticketLevel: 0},
    {name:"Cordón",         ticketLevel: 0},
    {name:"Punta carretas", ticketLevel: 0},
    {name:"Prado",          ticketLevel: 1},
    {name:"Tres cruces",    ticketLevel: 1},
    {name:"Malvin",         ticketLevel: 1},
    {name:"Manga",          ticketLevel: 2},
    {name:"Carrasco",       ticketLevel: 2}
];

function estimarPresupuesto(celulares, brands){
    function datoMalIngresado(nombreInput){
        alert( nombreInput + " no encontrado/a, vuelva a intentar");
        return
    }
    //Input de MARCA
    let marca = prompt("Ingrese la marca de su dispositivo").toUpperCase();
    while(!brands.includes(marca)){
        //Me quedo hasta que el usuario ingrese un input correcto
        datoMalIngresado("Marca")
        marca = prompt("Ingrese la marca de su dispositivo").toUpperCase();
    }
    //Acoto el rango de busqueda para los siguientes pasos
    let celusFiltrados = celulares.filter( celu => celu.brand == marca);

    //Input de MODELO
    let modelo = prompt("Ingrese el modelo de su dispositivo").toUpperCase();
    while(!celusFiltrados.some(celu => celu.model == modelo)){
        //Me quedo hasta que el usuario ingrese un input correcto
        datoMalIngresado("Modelo");
        modelo = prompt("Ingrese el modelo de su dispositivo").toUpperCase();
    }
    let celuRoto = celusFiltrados.find(celu => celu.model == modelo);

    //Input de MODELO
    let presupuesto = celuRoto.presupuestarArreglo(prompt("Ingrese su problema o parte dañada"));
    while(presupuesto == -1){
        //Me quedo hasta que el usuario ingrese un input correcto
        datoMalIngresado("Problema");
        presupuesto = celuRoto.presupuestarArreglo(prompt("Ingrese su problema o parte dañada"));
    }

    alert("El presupuesto de su reparación es " + presupuesto + " dolares");
    return {phone:celuRoto,budget:presupuesto};
}

function costoEnvio(){
    //Se asume que el cliente confirmó que quiere envio

    function zonaNoEncontrada(nombreInput){
        alert( nombreInput + " no esta dentro de nuestra zona de cobertura");
        return
    }
    
    function getLvL(lugar, zonaCubierta){
        let zonaObj = zonaCubierta.find(zona => zona.name.toUpperCase() == lugar);
        if(undefined == zonaObj){
            return -1;
        }
        console.log("zonaObj es \n");
        console.log(zonaObj);
        console.log(zonaObj.ticketLevel);
        console.log(typeof(zonaObj.ticketLevel));
        return parseInt(zonaObj.ticketLevel);
    }

    function ticketCost(departmentLvL, nhoodLvL){
        //Precondicion: Si el barrio no aplica, nhoodLvL es -1
        const departmentCost = [0, 10, 30, 35]; //dolares
        const nhoodCost = [0, 5, 8]; //dolares
        console.log("nivel hood es \n");
        console.log(nhoodLvL);
        console.log("nivel depmt \n");
        console.log(departmentLvL);
        if (nhoodLvL>0){
            console.log("costo hood es \n");
            console.log(nhoodCost[nhoodLvL]);
            return departmentCost[departmentLvL] + nhoodCost[nhoodLvL];
        }
        return departmentCost[departmentLvL];
    }
    
    //Input de departamento
    let departamento = prompt("Ingrese su departamento").toUpperCase();
    let nivelInterdep = getLvL(departamento, coveredDepartment);
    while(nivelInterdep == -1){
        //Me quedo hasta que el usuario ingrese un input correcto
        zonaNoEncontrada(departamento);
        departamento = prompt("Ingrese su departamento").toUpperCase();
        nivelInterdep = getLvL(departamento, coveredDepartment);
    }

    let nivelUrbano;
    console.log("departamento es \n");
    console.log(departamento);
    if(departamento == coveredDepartment[0].name.toLocaleUpperCase()){
        //0 es montevideo
        //Input del barrio de montevideo
        console.log("estoy en montevideo");
        let barrio = prompt("Ingrese su barrio").toUpperCase();
        nivelUrbano = getLvL(barrio, coveredNeighborhood);
        console.log("en un barrio de nivel");
        console.log(nivelUrbano);
        console.log(typeof(nivelUrbano));
        while(nivelUrbano == -1){
            //Me quedo hasta que el usuario ingrese un input correcto
            zonaNoEncontrada(barrio);
            barrio = prompt("Ingrese su barrio").toUpperCase();
            nivelUrbano = getLvL(barrio, coveredNeighborhood);
        }
    }
    else{
        console.log("estoy en el interior");
        nivelUrbano = -1;
    }

    console.log("llamo a ticket con");
    console.log(nivelInterdep);
    console.log(nivelUrbano);
    let costo = ticketCost(nivelInterdep,parseInt(nivelUrbano));
    console.log("costo es \n");
    console.log(costo);
    if(isNaN(costo)){
        alert("error, costo isNaN");
    }
    else if(costo < 0){
        alert("error, costo menor a 0");
    }
    else{
        alert("Su costo de envío es " + Math.round(costo) + " dolares\npor enviar a " + departamento);
    }
    return {place:departamento,shipping:Math.round(costo)};
}

let selectMarca = document.getElementById("brand");
selectMarca.addEventListener("change", (event) =>
    console.log(`El modelo es ${event.target.value}`));


let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) =>{

    function zonaNoEncontrada(nombreInput){
        alert( nombreInput + " no esta dentro de nuestra zona de cobertura");
        return
    }
    
    function getLvL(lugar, zonaCubierta){
        let zonaObj = zonaCubierta.find(zona => zona.name.toUpperCase() == lugar);
        if(undefined == zonaObj){
            return -1;
        }
        console.log("zonaObj es \n");
        console.log(zonaObj);
        console.log(zonaObj.ticketLevel);
        console.log(typeof(zonaObj.ticketLevel));
        return parseInt(zonaObj.ticketLevel);
    }

    function ticketCost(departmentLvL, nhoodLvL){
        //Precondicion: Si el barrio no aplica, nhoodLvL es -1
        const departmentCost = [0, 10, 30, 35]; //dolares
        const nhoodCost = [0, 5, 8]; //dolares
        console.log("nivel hood es \n");
        console.log(nhoodLvL);
        console.log("nivel depmt \n");
        console.log(departmentLvL);
        if (nhoodLvL>0){
            console.log("costo hood es \n");
            console.log(nhoodCost[nhoodLvL]);
            return departmentCost[departmentLvL] + nhoodCost[nhoodLvL];
        }
        return departmentCost[departmentLvL];
    }

    e.preventDefault();
    console.log("soy el trigger del submit");
    const brand = e.target.querySelector("#brand").value.toUpperCase();
    const model = e.target.querySelector("#model").value.toUpperCase();
    const damage = e.target.querySelector("#damage").value.toUpperCase();
    const department = e.target.querySelector("#department").value.toUpperCase();
    const nhood = e.target.querySelector("#neighborhood").value.toUpperCase();

    function datoEsVacio(dato){
        const vacio = '';
        return dato == vacio
    }
    
    if(!datoEsVacio(model) && !datoEsVacio(damage)){
        const celuRoto = phoneStock.find(celu => celu.model == model);
        let presupuesto = celuRoto.presupuestarArreglo(damage);
        let envio = -1;
        let facturaFinal;
        if(datoEsVacio(department)){
            facturaFinal = new FACTURA(
                celuRoto.model,
                presupuesto
            );
        }else{
            let nivelInterdep = getLvL(department, coveredDepartment);
            nivelUrbano = -1;
            if(department == coveredDepartment[0].name.toLocaleUpperCase()){
                //0 es montevideo
                //Input del barrio de montevideo
                nivelUrbano = getLvL(nhood, coveredNeighborhood);
            }
            else{
                nivelUrbano = -1;
            }
            let costo = ticketCost(nivelInterdep,parseInt(nivelUrbano));
            if(isNaN(costo)){
                alert("error, costo isNaN");
            }
            else if(costo < 0){
                alert("error, costo menor a 0");
            }
            facturaFinal = new FACTURA(
                celuRoto.model,
                presupuesto,
                Math.round(costo),
                department
            );
        }
        facturaFinal.mostrarFactura();
    }else{
        alert("ingrese correctamente los datos");
    }
})

/*let presupuesto = -1; //lo setteo a -1 por si quiero manejar errores

while(prompt("Quiere estimar su presupuesto [si/no]").toUpperCase() == "SI"){
    presupuesto = estimarPresupuesto(phoneStock, marcas);
}

let envio = -1;
while(prompt("Quiere calcular el costo de envío [si/no]").toUpperCase() == "SI"){
    envio=costoEnvio();
}
const facturaFinal = new FACTURA(presupuesto.phone,presupuesto.budget,envio.shipping,envio.place);
facturaFinal.mostrarFactura();
*/
