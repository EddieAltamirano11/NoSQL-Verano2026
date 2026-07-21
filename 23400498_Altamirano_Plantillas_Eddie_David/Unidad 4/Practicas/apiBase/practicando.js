const express = require("express");

const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const PORT = 3002;

let alumnos = [
    {
        id:1,
        nombre: "Eddie",
        carrera: "ISC",
        semestre: '7'
    },
    {
        id:2,
        nombre: "Juan",
        carrera: "IM",
        semestre: '6'
    }
];

//PUT mediante ID
app.put("/alumnos/:id", (req,res) =>{
    const id = Number(req.params.id);
    const {nombre,carrera,semestre} = req.body;
    if(!nombre,!carrera,!semestre){
        return res.status(404).json({msg:"Faltan Datos del Alumno"});
    }

    const indice = alumnos.findIndex(alumno => alumno.id === id);
    if (indice === -1){
        return res.status(404).json({msg:"Alumno no encontrado"});
    }

    alumnos[indice] = {
        id:id,
        nombre:nombre,
        carrera:carrera,
        semestre:semestre
    }

    res.json({
        msg:"Alumno actualizado correctamente",
        alumno: alumnos[indice];
    });
});

app.listen(PORT, () =>{
    console.log("Servidor iniciado en http://localhost:"+PORT);
});
