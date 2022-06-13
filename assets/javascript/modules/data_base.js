import { PHONE } from "./phone.js";

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

export { PHONE } from "./phone.js";
export { phoneStock, coveredDepartment, coveredNeighborhood };
