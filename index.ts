import express from 'express';

import { Pieza }        from './Pieza';
import { Proceso }      from './Proceso';
import { PiezaEntrada } from './PiezaEntrada';
import { PiezaSalida }  from './PiezaSalida';

const app: express.Application = express();

const PORT: Number = 3120;

app.use(express.json());

let piezas:        Array<Pieza>        = new Array<Pieza>;
let piezasEntrada: Array<PiezaEntrada> = new Array<PiezaEntrada>;
let piezasSalida:  Array<PiezaSalida>  = new Array<PiezaSalida>;
let procesos:      Array<Proceso>      = new Array<Proceso>

//para testear
piezas.push(new Pieza(0, "Hierro", 20));
piezas.push(new Pieza(1, "Metal",  10));
piezas.push(new Pieza(2, "Acero",  80));
piezas.push(new Pieza(3, "Chapa",  85));

piezasEntrada.push(new PiezaEntrada(0, piezas));
piezasEntrada.push(new PiezaEntrada(1, piezas));
piezasEntrada.push(new PiezaEntrada(2, 3));
piezasEntrada.push(new PiezaEntrada(3, 0));

piezasSalida.push(new PiezaSalida(0,1));
piezasSalida.push(new PiezaSalida(1,2));
piezasSalida.push(new PiezaSalida(2,3));
piezasSalida.push(new PiezaSalida(3,2));

procesos.push(new Proceso(0, piezasSalida, piezasEntrada));

app.get('/', (_req , _res) => {_res.redirect("/home"); });

app.listen(PORT, () => console.log(`Puerto usado: ${PORT}`));

//GET
app.get("/procesos",       (_req, _res) => { _res.json(procesos);      })
app.get("/piezas",         (_req, _res) => { _res.json(piezas);        })
app.get("/piezas/entrada", (_req, _res) => { _res.json(piezasEntrada); });
app.get("/piezas/salida",  (_req, _res) => { _res.json(piezasSalida);  });

//GET by id
app.get("/piezas/:id", (_req, _res) => { 
    _res.json(piezas.find(item => { return item.id == Number(_req.params.id); })); 
});
app.get("/procesos/:id", (_req, _res) => {
    _res.json(procesos.find(item => { return item.id == Number(_req.params.id); }) );
});
app.get("/piezas/entrada/:id", (_req, _res) => {
    _res.json(piezasEntrada.find(item => { return item.id == Number(_req.params.id); }));
});
app.get("/piezas/salida/:id", (_req, _res) => {
    _res.json(piezasSalida.find(item => { return item.id == Number(_req.params.id); }));
});

//POST (add)
app.post("/piezas", (_req, _res) => {
    const pieza = new Pieza(
        _req.body.id,
        _req.body.material,
        _req.body.peso,
    );
    piezas.push(pieza);
    _res.json(pieza);
});
app.post("/procesos", (_req, _res) => {
    const proceso = new Proceso(
        _req.body.id,
        _req.body.costo,
        _req.body.tipo
    );
    procesos.push(proceso);
    _res.json(proceso);
});
app.post("/piezas/entrada", (_req, _res) => {
    const piezaEntrada = new PiezaEntrada(
        _req.body.id,
        _req.body.id_pieza
    );
    piezasEntrada.push(piezaEntrada);
    _res.json(piezaEntrada);
});
app.post("/piezas/salida",  (_req, _res) => {
    const piezaSalida = new PiezaSalida(
        _req.body.id,
        _req.body.id_pieza
    );
    piezasSalida.push(piezaSalida);
    _res.json(piezaSalida);
});


//PATCH (edit)
app.patch("/procesos/:id", (_req, _res) => {
    const proceso = procesos.find(item => { return item.id == Number(_req.params.id); });
    if (!proceso) return;

    proceso.id    = _req.body.id;
    proceso.piezasEntrada = _req.body.piezasEntrada;
    proceso.piezasSalida  = _req.body.piezaSalida;
    
    _res.json(proceso);
})
app.patch("/piezas/:id", (_req, _res) => {
    const pieza = piezas.find(item => { return item.id == Number(_req.params.id); });
    if (!pieza) return;

    pieza.id       = _req.body.id;
    pieza.material = _req.body.material; 
    pieza.peso     = _req.body.peso;

    _res.json(pieza);
});
app.patch("/piezas/entrada/:id",(_req, _res) => {
    const piezaEntrada = piezasEntrada.find(item => { return item.id == Number(_req.params.id); });
    if (!piezaEntrada) return;

    piezaEntrada.id       = _req.body.id;
    piezaEntrada.id_pieza = _req.body.id_pieza;

    _res.json(piezaEntrada);
});
app.patch("/piezas/salida/:id",(_req, _res) => {
    const piezaSalida = piezasSalida.find(item => { return item.id == Number(_req.params.id); });
    if (!piezaSalida) return;

    piezaSalida.id       = _req.body.id;
    piezaSalida.id_pieza = _req.body.id_pieza;

    _res.json(PiezaSalida);
});

//DELETE (7w7)
app.delete("/procesos/:id", (_req, _res) => {
    const proceso = procesos.find(item => { return item.id == Number(_req.params.id); });
    if (!proceso) return;
    delete procesos[procesos.indexOf(proceso)];
    _res.status(204).send()
});
app.delete("/piezas/:id", (_req, _res) => {
    const pieza = piezas.find(item => { return item.id == Number(_req.params.id); });
    if (!pieza) return;
    delete piezas[piezas.indexOf(pieza)]; 
    _res.status(204).send()
});
app.delete("/piezas/entrada/:id", (_req, _res) => {
    const piezaEntrada = piezasEntrada.find(item => { return item.id == Number(_req.params.id); });
    if (!piezaEntrada) return;
    delete piezasEntrada[piezasEntrada.indexOf(piezaEntrada)]; 
    _res.status(204).send()
});
app.delete("/piezas/salida/:id", (_req, _res) => {
    const piezaSalida = piezasSalida.find(item => { return item.id == Number(_req.params.id); });
    if (!piezaSalida) return;
    delete piezasSalida[piezasSalida.indexOf(piezaSalida)]; 
    _res.status(204).send()
});