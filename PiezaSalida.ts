import { Pieza } from "./Pieza";

export class PiezaSalida {
    id: Number;
    piezas: Array<Pieza> = new Array<Pieza>;
    constructor(_id: Number, _piezas: Array<Pieza>){
        this.id = _id;
        this.piezas = _piezas;
    }
}