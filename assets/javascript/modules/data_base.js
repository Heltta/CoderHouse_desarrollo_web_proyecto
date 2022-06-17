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

const coveredDepartment = [];
fetch('../javascript/json/departamentos.json')
.then(awnser => awnser.json())
.then(parsedAnswer => {
    //Awnser's body is parsed as JSON
    parsedAnswer.forEach(department => { 
        coveredDepartment.push(department);
    });
})

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
