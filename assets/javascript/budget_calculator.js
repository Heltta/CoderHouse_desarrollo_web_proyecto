const marcas = ["APPLE", "XIAOMI", "SAMSUNG", "LG", "DESCONOCIDA"];

function datoMalIngresado(nombreInput){
    alert( nombreInput + " no encontrado/a, vuelva a intentar");
    return
}

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
                        {arreglo:"puerto de carga", costo:0.020},
                        {arreglo:"bateria", costo:0.1},
                        {arreglo:"sin señal", costo: 0.3},
                        {arreglo:"software", costo: 0.15}];
        const tarifaProblema = tarifas.find(element => element.arreglo == problema);
        if (tarifaProblema == undefined){
            return -1; //error al ingresar problema
        }
        return (this.price * tarifaProblema.costo);
    }
}

//sigo usando arreglos como bases de datos precarias
const phoneStock = [];
phoneStock.push(new PHONE("redmi note 10", "xiaomi", 500));
phoneStock.push(new PHONE("redmi note 9", "xiaomi", 400));
phoneStock.push(new PHONE("redmi note 8", "xiaomi", 300));
phoneStock.push(new PHONE("redmi note 7", "xiaomi", 200));
phoneStock.push(new PHONE("iphone 10", "apple", 1000));
phoneStock.push(new PHONE("iphone 9", "apple", 900));
phoneStock.push(new PHONE("iphone 8", "apple", 800));
phoneStock.push(new PHONE("iphone 7", "apple", 700));
phoneStock.push(new PHONE("iphone 6", "apple", 600));
phoneStock.push(new PHONE("galaxy 10", "samsung", 950));
phoneStock.push(new PHONE("galaxy 9", "samsung", 850));
phoneStock.push(new PHONE("galaxy 8", "samsung", 750));
phoneStock.push(new PHONE("galaxy 7", "samsung", 650));
phoneStock.push(new PHONE("galaxy 6", "samsung", 550));
phoneStock.push(new PHONE("nexus 10", "lg", 800));
phoneStock.push(new PHONE("nexus 9", "lg", 720));
phoneStock.push(new PHONE("nexus 8", "lg", 680));
phoneStock.push(new PHONE("nexus 7", "lg", 560));
phoneStock.push(new PHONE("nexus 6", "lg", 250));

function estimarPresupuesto(celulares, brands){
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
}

while(prompt("Quiere estimar su presupuesto [si/no]").toUpperCase() == "SI"){
    estimarPresupuesto(phoneStock, marcas);
}
