import { PiezaEntrada } from "./PiezaEntrada";
import { PiezaSalida } from "./PiezaSalida";

export class Proceso {
    id:    Number;
    piezasSalida: Array<PiezaSalida>;
    piezasEntrada:Array<PiezaEntrada>;
    
    /*
    constructor(_id: Number) {
        this.piezasSalida = new Array<PiezaSalida>;
        this.piezasEntrada = new Array<PiezaEntrada>;
        this.id    = _id;
    }*/

    constructor(_id: Number, piezSal: Array<PiezaSalida>, piezEnt: Array<PiezaEntrada>) {
        this.id = _id;
        this.piezasEntrada = piezEnt;
        this.piezasSalida = piezSal;
    }
};