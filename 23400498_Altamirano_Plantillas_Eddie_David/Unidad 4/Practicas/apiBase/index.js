const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()); // Para poder recibir datos de tipo JSON
app.use(morgan("dev"));
const PORT = 3000;
/*
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
];*/
mongoose.connect("mongodb://127.0.0.1:27017/escuela").then(()=>{
    console.log("Conectado Correctamente");
}).catch((error) =>{
    console.log("Error al conectar con MongoDB:", error);
});

const alumnoSchema = new mongoose.Schema(
    {
        nombre: {type: String, required: true, trim: true},
        carrera: {type: String, required: true, trim: true},
        semestre: {type: Number, required: true, min: 1},
    },
    {
        timestamps:true
    }
);
const Alumno = mongoose.model("Alumno", alumnoSchema,"alumnos");

app.get("/",(req, res) => {
    res.send("Hola Mundo");
});


app.get("/alumnos", async (req,res) =>{
    try{
        const alumnos = await Alumno.find();
        res.json(alumnos);
    }catch (error){
        res.status(500).json({
            mensaje: "Error al obtener los alumnos",
            error: error
        });
    }
});

app.get("/alumnos/:id", async (req,res) =>{
    const id = req.params.id;
    try{
        const alumno = await Alumno.findById(id);
        if(!alumno){
            return res.status(404).json({mensaje:"Alumno no encontrado"});
        }
        res.json(alumno);
    }catch(error){
         res.status(500).json({mensaje:"Error al obtener Alumno", error:error})
    }
});

app.post("/alumnos", async (req,res) => {
    try{  
        const {nombre,carrera,semestre} = req.body;
        if(!nombre || !carrera || !semestre){
            return res.status(404).json({
                mensaje: "Faltan datos del alumno"
            })
        }
        const nuevoAlumno = new Alumno({
            nombre, carrera, semestre
        });
        const alumnoGuardado = await nuevoAlumno.save();
        res.json({
            mensaje: "Alumno registrado correctamente",
            alumno: alumnoGuardado
        });
    }catch(error){
        res.status(500).json({mensaje:"Error al guardar Alumno", error:error})
    }
})

app.put("/alumnos/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const {nombre,carrera,semestre} = req.body;

        if(!nombre || !carrera || !semestre){
            return res.status(404).json({
                mensaje: "Faltan datos del alumno"
            });
        }
        const alumnoActualizado = await Alumno.findByIdAndUpdate(
            id,
            {nombre,carrera,semestre},
             //New te regresa el documento ya actualizado si es true, si no, te regresa el método antes de actualziar
             // runValidators verifica que se cumplan las reglas del esquema antes de intentar hacer la actualización.
            {new: true, runValidators: true}
        );

        if (!alumnoActualizado){
            return res.status(404).json({
                mensaje: "Alumno no encontrado."
            });
        }

        res.json({
            mensaje: "Alumno actualizado correctamente",
            alumno: alumnoActualizado
        });
    }catch(error){
        res.status(500).json({mensaje:"Error al actualizar Alumno", error:error})
    }
    
});


app.delete("/alumnos/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const alumnoBorrado = await Alumno.findByIdAndDelete(id);
        if (!alumnoBorrado){
            return res.status(404).json({
                mensaje: "Alumno no encontrado."
            });
        }
        
        res.json({
            mensaje: "Alumno eliminado correctamente",
            alumno: alumnoBorrado
        });
    }catch(error){
        res.status(500).json({mensaje:"Error al eliminar Alumno", error:error});
    }
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


