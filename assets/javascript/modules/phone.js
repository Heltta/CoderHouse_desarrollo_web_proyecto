class PHONE{
    constructor(model='', brand="DESCONOCIDA", price=0){
        this.model = model.toUpperCase();
        this.brand = brand.toUpperCase();
        (isNaN(price))? this.price = 0 : this.price = price;
        
    }
    static get marcas(){
        return ["Apple", "Xiaomi", "Samsung", "LG"];
    }
    static get damage(){ 
        return [{arreglo:"Pantalla", costo:0.5},
                {arreglo:"Puerto de entrada", costo:0.020},
                {arreglo:"Bateria", costo:0.1},
                {arreglo:"Señal", costo: 0.3},
                {arreglo:"Software", costo: 0.15}];
    }
    presupuestarArreglo(problema){
        //el costo del arreglo es proporcional al costo del producto a arreglar
        //return -1 si hay un error

        //Me aseguro que las mayusculas no sean un problema
        problema = problema.toLowerCase();
        const tarifas = PHONE.damage;
        tarifas.forEach(element => {
            //tarifas no comparte memoria con PHONE.damage
            element.arreglo = element.arreglo.toLowerCase();
            
        });

        const tarifaProblema = tarifas.find(element => element.arreglo == problema);
        return (tarifaProblema == undefined) ? -1 : (this.price * tarifaProblema.costo);
    }
}

export { PHONE };
