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

export { PHONE };
