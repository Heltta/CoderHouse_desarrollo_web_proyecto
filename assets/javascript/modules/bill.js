import { PHONE } from "./phone.js";

class BILL{
    constructor(phone=null, budget=-1,damage=null, shipping=-1, department=null, neighborhood = null){
        this.repair = {
            model: null,
            cost: budget,
            damage: damage
        }
        phone instanceof PHONE && (this.repair.model = phone?.model);
        this.shipping = {
            place: department,
            zone: neighborhood,
            cost: shipping
        }
    }
    static get resultID() {
        return "form__result";
    }
    mostrarFactura(){
        //Mostraré el resultado en un div nuevo dentro del form
        //tambien muestra coste de envío
        let resultado = document.getElementById(BILL.resultID);
        (resultado != null) && resultado.remove();
        let formulario = document.getElementsByTagName("form")[0];
        resultado = document.createElement("div");
        resultado.id= BILL.resultID;
        resultado.innerHTML = 
            `
            <h3>Estimado</h3>
            <section>
                <div>${this.repair.model}</div>
                <div>${this.repair.damage}</div>
                <div>
                    <span>Reparación</span>
                    <span>${this.repair.cost} dolares</span>
                </div>
            </section>
            `;
        if(this.shipping.cost>=0){
            resultado.innerHTML = resultado.innerHTML.concat(
                `
                <div>${this.shipping.place}</div>
                ${(this.shipping.zone == null)? 
                    '':
                    `<div>${this.shipping.zone}</div>`}
                <div>
                    <span>Envío</span>
                    <span>${(this.shipping.cost==0)? 
                        `Gratis`:
                        `${this.shipping.cost} dolares`} 
                    </span>
                </div>
                `
            )
        }
        formulario.appendChild(resultado);
    
        return;
    }
}

export { PHONE } from "./phone.js";
export { BILL };
