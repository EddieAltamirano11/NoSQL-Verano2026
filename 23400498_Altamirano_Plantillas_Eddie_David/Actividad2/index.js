const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
const PORT = 3001


//ACTIVIDAD 1: Detector de par o impar
app.get("/par/:num",(req, res) => {
    const num = parseInt(req.params.num);
    if (isNaN(num)) {
        return res.send("Debes ingresar un número válido.");
    }
    if (num % 2 == 0){
        res.send(num + " es un número par.");
    }else{
        res.send(num + " es un número impar.");
    }
});


// ACTIVIDAD 2: Mayoría de Edad
app.get("/edad/:e", (req,res) =>{
    const e = parseInt(req.params.e);
    if (isNaN(e)) {
        return res.send("Debes ingresar una edad válida.");
    }
    if (e>=18){
        res.send("Eres mayor de edad");
    } else{
        res.send("Eres menor de edad");
    }
});


//ACTIVIDAD 3: Calculadora
app.get("/calculadora/:op/:a/:b",(req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    if (isNaN(a) || isNaN(b)) {
        return res.send("Debes ingresar dos números válidos.");
    }
    const op = (req.params.op).toLowerCase();
    switch (op){
        case '+': case 'suma':
            res.send("Resultado: " + (a+b));
        break;
        case '-': case 'resta':
            res.send("Resultado: " + (a-b));
        break;
        case '*': case 'multiplicacion':
            res.send("Resultado: " + (a*b));
        break;
        case 'division': case 'división': case '/':
            if (b === 0) {
                return res.send("No se puede dividir entre cero.");
            }
            res.send("Resultado: " + (a/b));
        break;
        default:
            res.send('Operacion no valida')
    }
});

//ACTIVIDAD 4: Tabla de Multiplicar
app.get("/tabla/:num",(req, res) => {
    const num = parseInt(req.params.num);
    if (isNaN(num)) {
        return res.send("Debes ingresar un número válido.");
    }
    let tabla = "";
    for (let i = 1; i<=10; i++){
        tabla += `${num} x ${i} = ${(num*i)}<br>`;
    }
    res.send(tabla);
});


//ACTIVIDAD 5: Calificación
app.get("/calificacion/:nota",(req, res) => {
    const nota = parseInt(req.params.nota);
    if (isNaN(nota)) {
        return res.send("Debes ingresar una calificación válida.");
    }
    if (nota >= 90 && nota <= 100){
        res.send("Excelente");
    } else if (nota >= 80 && nota < 90){
        res.send("Muy Bien");
    } else if (nota >= 70 && nota < 80){
        res.send("Aprobado");
    } else if (nota >= 0 && nota < 70){
        res.send("Reprobado");
    } else {
        res.send("Rango de calificación inválido");
    }
});


app.listen(PORT, () => {
    console.log("Servidor iniciado en http://localhost:"+PORT);
});