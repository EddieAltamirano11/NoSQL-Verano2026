const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"));
const PORT = 3000;

app.get("/",(req, res) => {
    res.send("Hola Mundo");
});

app.get("/mensaje", (req,res) =>{
    res.send("Mensaje desde Exress");
})

app.get("/mensaje", (req,res) =>{
    res.send("Mensaje desde Exress 2");
})


app.get("/pagina",(req,res) => {
    const nombre = "Eddie Altamirano"
    res.send(`
            <style> 
                .p1{
                    color:red;
                    background:blue;
                    font-size:1.8rem;
                }
            </style>
            <h1>Mi página web</h1>
            <p class = "p1">Creada con Express</p>
            <p>Hola ${nombre}</p>
        `);
});

app.get("/alumno", (req,res) =>{
    res.json({
        nombre: "Eddie",
        carrera:"ISC",
        semestre: 7
    });
});

app.get("/materias", (req,res) =>{
    res.json([
        {
        nombre:"NoSQL",
        hora:"8:00 - 11:00"
        },
        {
        nombre:"Programación Web",
        hora:"14:00 - 17:00"
        }
    ]);
});

app.get("/mensaje/:nombre", (req,res) =>{
    res.send(`Hola ${req.params.nombre}`);
});

app.get("/suma/:a/:b", (req,res) =>{
    const a = parseInt(req.params.a);
    const b = Number(req.params.b);
    res.send(`Resultado: ${a+b}`);
});


app.get("/multiplicar/:a/:b", (req,res) =>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`Resultado: ${a*b}`);
});

app.get("/aleatorio", (req,res) =>{
    let numero = -1;
    let intentos = 0;
    while (numero != 100){
        intentos ++;
        numero = Math.floor(Math.random() * 100) + 1;
    }
    
    res.send("Número Generado: " + numero + "\nIntentos Necesarios: " + intentos);
});

app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:"+PORT);
});