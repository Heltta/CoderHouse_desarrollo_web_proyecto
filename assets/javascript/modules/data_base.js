import { PHONE } from "./phone.js";

//sigo usando arreglos como bases de datos precarias
const phoneStock = [];
fetch('../javascript/json/phonestock.json')
    .then(answer => answer.json())
    .then(parsedAnswer => {
        //Answer's body is parsed as JSON
        parsedAnswer.forEach(phone => { 
            phoneStock.push(Object.assign(new PHONE, phone));
        });
    })

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

export { PHONE } from "./phone.js";
export { phoneStock, coveredDepartment, coveredNeighborhood };
