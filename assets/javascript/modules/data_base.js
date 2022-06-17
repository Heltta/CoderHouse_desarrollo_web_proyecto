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

const coveredNeighborhood = [];
fetch('../javascript/json/barrios_montevideo.json')
.then(awnser => awnser.json())
.then(parsedAnswer => {
    //Awnser's body is parsed as JSON
    parsedAnswer.forEach(barrio => { 
        coveredNeighborhood.push(barrio);
    });
})

export { PHONE } from "./phone.js";
export { phoneStock, coveredDepartment, coveredNeighborhood };
