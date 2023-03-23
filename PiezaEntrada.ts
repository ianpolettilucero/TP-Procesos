import { Pieza } from "./Pieza";

export class PiezaEntrada {
    id: Number;
    piezas: Array<Pieza> = new Array<Pieza>;
    constructor(_id: Number,_piezas: Array<Pieza>){
        this.piezas = _piezas;
        this.id = _id;
    }
}