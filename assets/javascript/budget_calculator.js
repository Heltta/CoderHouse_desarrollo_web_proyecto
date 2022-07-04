import { BILL as FACTURA } from "./modules/bill.js";

import { phoneStock, coveredDepartment, coveredNeighborhood, PHONE } from "./modules/data_base.js"

String.prototype.isBlank = function (){
    //Returns true if the string is blank
    const blank = '';
    return this == blank
}

//Eventos
let selectMarca = document.getElementById("brand");
selectMarca.addEventListener("change", (event) =>{
    document.getElementById("model").innerHTML = `<option value="">No sabe</option>`;
    if(!event.target.value?.isBlank()){
        //El usuario ingreso una opcion distinta a "no sabe" en la marca
        let celusFiltrados = phoneStock.filter( celu => celu.brand == event.target.value.toUpperCase());
        
        //pendiente convertir en funcion
        celusFiltrados.forEach((celu) => {
            document.getElementById("model").innerHTML = document.getElementById("model").innerHTML.concat(
                `<option>${celu.model.toLowerCase()}</option>`
                
            )
            document.getElementById("model").querySelector("option:last-of-type").value = celu.model;
        })
    }
});

let selectDepartm = document.getElementById("department");
selectDepartm.addEventListener("change", (event) =>{
    //reseteo al default cada vez que la llamo
    //asi evito que se stackeen los barrios
    document.getElementById("neighborhood").innerHTML = `<option value="">No aplica</option>`;
    if(event.target.value == coveredDepartment[0].name){ //(si es montevideo)

        document.getElementById("neighborhood").innerHTML = `<option value="">No aplica</option>`;

        coveredNeighborhood.forEach((barrio) => {
            document.getElementById("neighborhood").innerHTML = document.getElementById("neighborhood").innerHTML.concat(
                `<option>${barrio.name}</option>`
                
            )
            document.getElementById("neighborhood").querySelector("option:last-of-type").value = barrio.name;
        })
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
                presupuesto,
                damage
            );
        }else{
            let nivelInterdep = getLvL(department, coveredDepartment);
            let nivelUrbano = -1;
            if(department == coveredDepartment[0].name.toLocaleUpperCase()){
                //0 es montevideo
                //Input del barrio de montevideo
                if(nhood.isBlank()){
                    Swal.fire({
                        title: 'Error! Faltan datos',
                        text: `Ingrese el barrio del envío`,
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    })
                    return
                }
                nivelUrbano = getLvL(nhood, coveredNeighborhood);
            }
            else{
                nivelUrbano = -1;
            }
            let costo = ticketCost(nivelInterdep,parseInt(nivelUrbano));
            facturaFinal = new FACTURA(
                celuRoto,
                presupuesto,
                damage,
                Math.round(costo),
                department,
                (nivelUrbano>=0)? nhood: null,
            );
        }
        let facturJSON = JSON.stringify(facturaFinal);
        localStorage.setItem("lastBudget", facturJSON);
        facturaFinal.mostrarFactura();
    }else{
        let datosFaltantes;
        if(model.isBlank() && damage.isBlank()){
            datosFaltantes = 'el modelo y el problema';
        }else if(model.isBlank()){
            datosFaltantes = 'el modelo';
        }else{
            datosFaltantes = 'el problema'
        }
        Swal.fire({
            title: 'Error! Faltan datos',
            text: `Ingrese ${datosFaltantes} de su celular`,
            icon: 'error',
            confirmButtonText: 'Entendido'
          })
          return;
    }
})

formulario.addEventListener("reset", (e) =>{
    const factura = e.target.querySelector(`#${FACTURA.resultID}`);
    (factura != null) && factura.remove();
    localStorage.removeItem("lastBudget")
    Swal.fire({
        title: 'Borrado!',
        icon: 'success',
        text: 'Los datos ingresados y sus cálculos previos han sido borrados del navegador'
    })
})

window.addEventListener("load", (e) =>{
    const lastBudgetString = localStorage.getItem("lastBudget");
    if (lastBudgetString != null){
        let lastBudgetObject = JSON.parse(lastBudgetString);
        lastBudgetObject = Object.assign(new FACTURA, lastBudgetObject);
        lastBudgetObject.mostrarFactura();
    }

    document.getElementById("damage").innerHTML = `<option value="">No sabe</option>`;

    PHONE.damage.forEach((problema) => {
        document.getElementById("damage").innerHTML = document.getElementById("damage").innerHTML.concat(
            `<option>${problema.arreglo}</option>`
        )
        document.getElementById("damage").querySelector("option:last-of-type").value = problema.arreglo;
    })
})
//Fin de eventos
