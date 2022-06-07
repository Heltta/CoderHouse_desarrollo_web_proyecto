class PHONE{
    constructor(model, brand="DESCONOCIDA", price=0){
        this.model = model.toUpperCase();
        this.brand = brand.toUpperCase();
        (isNaN(price))? this.price = 0 : this.price = price;
        
    }
    static get marcas(){
        return ["APPLE", "XIAOMI", "SAMSUNG", "LG", "DESCONOCIDA"];
    }
    presupuestarArreglo(problema){
        //el costo del arreglo es proporcional al costo del producto a arreglar
        //return -1 si hay un error
        problema = problema.toLowerCase();
        const tarifas = [{arreglo:"pantalla", costo:0.5},
                        {arreglo:"puerto_de_carga", costo:0.020},
                        {arreglo:"bateria", costo:0.1},
                        {arreglo:"sin_señal", costo: 0.3},
                        {arreglo:"software", costo: 0.15}];
        const tarifaProblema = tarifas.find(element => element.arreglo == problema);
        return (tarifaProblema == undefined) ? -1 : (this.price * tarifaProblema.costo);
    }
}

class FACTURA{
    constructor(phone=null, budget=-1, shipping=-1, department=null){
        this.repair = {
            model: null,
            cost: budget
        }
        phone instanceof PHONE && (this.repair.model = phone?.model);
        this.shipping = {
            place: department,
            cost: shipping
        }
    }
    static get resultID() {
        return "form__result";
    }
    mostrarFactura(){
        //Mostraré el resultado en un div nuevo dentro del form
        //tambien muestra coste de envío
        let resultado = document.getElementById(FACTURA.resultID);
        (resultado != null) && resultado.remove();
        let formulario = document.getElementsByTagName("form")[0];
        resultado = document.createElement("div");
        resultado.id= FACTURA.resultID;
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

String.prototype.isBlank = function (){
    //Returns true if the string is blank
    const blank = '';
    return this == blank
}

//Eventos
let selectMarca = document.getElementById("brand");
selectMarca.addEventListener("change", (event) =>{
    document.getElementById("model").innerHTML = `<option value="">No sabe</option>`;
    if(event.target.value?.isBlank()){
        phoneStock.forEach((celu) => {
            //El formato no es muy user friendly
            document.getElementById("model").innerHTML = document.getElementById("model").innerHTML.concat(
                `<option value=${celu.model}>${celu.model.toLowerCase()}</option>`
            )
        })
    }
    else{
        let celusFiltrados = phoneStock.filter( celu => celu.brand == event.target.value.toUpperCase());
        
        //pendiente convertir en funcion
        celusFiltrados.forEach((celu) => {
            //El formato no es muy user friendly
            document.getElementById("model").innerHTML = document.getElementById("model").innerHTML.concat(
                `<option value=${celu.model}>${celu.model.toLowerCase()}</option>`
            )
        })
    }
});

let selectDepartm = document.getElementById("department");
selectDepartm.addEventListener("change", (event) =>{
    //reseteo al default cada vez que la llamo
    //asi evito que se stackeen los barrios
    document.getElementById("neighborhood").innerHTML = `<option value="">No aplica</option>`;
    if(event.target.value == coveredDepartment[0].name){ //(si es montevideo)
        document.getElementById("neighborhood").innerHTML = 
        `
            <option value="">No aplica</option>
            <option value="Centro">Centro</option>
            <option value="Ciudad Vieja">Ciudad Vieja</option>
            <option value="Cordón">Cordón</option>
            <option value="Punta carretas">Pta. Carretas</option>
            <option value="Prado">Prado</option>
            <option value="Tres cruces">Tres cruces</option>
            <option value="Malvin">Malvin</option>
            <option value="Manga">Manga</option>
            <option value="Carrasco">Carrasco</option>
        `;
    }
});

let formulario = document.querySelector("form");
formulario.addEventListener("submit", (e) =>{
    
    function getLvL(lugar, zonaCubierta){
        let zonaObj = zonaCubierta.find(zona => zona.name.toUpperCase() == lugar);
        if(undefined == zonaObj){
            return -1;
        }
        return parseInt(zonaObj.ticketLevel);
    }

    function ticketCost(departmentLvL, nhoodLvL){
        //Precondicion: Si el barrio no aplica, nhoodLvL es -1
        const departmentCost = [0, 10, 30, 35]; //dolares
        const nhoodCost = [0, 5, 8]; //dolares
        if (nhoodLvL>0){
            console.log("costo hood es \n");
            console.log(nhoodCost[nhoodLvL]);
            return departmentCost[departmentLvL] + nhoodCost[nhoodLvL];
        }
        return departmentCost[departmentLvL];
    }

    e.preventDefault();
    const brand = e.target.querySelector("#brand").value.toUpperCase();
    const model = e.target.querySelector("#model").value.toUpperCase();
    const damage = e.target.querySelector("#damage").value.toUpperCase();
    const department = e.target.querySelector("#department").value.toUpperCase();
    const nhood = e.target.querySelector("#neighborhood").value.toUpperCase();
    
    if(!model.isBlank() && !damage.isBlank()){
        const celuRoto = phoneStock.find(celu => celu.model == model);
        let presupuesto = celuRoto.presupuestarArreglo(damage);
        let facturaFinal;
        if(department.isBlank()){
            facturaFinal = new FACTURA(
                celuRoto,
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
                celuRoto,
                presupuesto,
                Math.round(costo),
                department
            );
        }
        let facturJSON = JSON.stringify(facturaFinal);
        localStorage.setItem("lastBudget", facturJSON);
        facturaFinal.mostrarFactura();
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese correctamente los datos',
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
    }
})

formulario.addEventListener("reset", (e) =>{
    const factura = e.target.querySelector(`#${FACTURA.resultID}`);
    if (factura != null){
        factura.remove();
    }
    localStorage.removeItem("lastBudget")
})

window.addEventListener("load", (e) =>{
    const lastBudgetString = localStorage.getItem("lastBudget");
    if (lastBudgetString != null){
        let lastBudgetObject = JSON.parse(lastBudgetString);
        lastBudgetObject = Object.assign(new FACTURA, lastBudgetObject);
        lastBudgetObject.mostrarFactura();
    }
})
//Fin de eventos
