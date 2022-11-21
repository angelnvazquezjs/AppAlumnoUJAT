import {saveDate, listarDatos, onGetAlumnos, deleteAlumnos, getALumno, updateAlumno} from './firebase.js';

const formulario = document.getElementById("formulario");
const contenedor = document.getElementById('contenedor-sombra');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async() => {
    
   onGetAlumnos((listaDatos) => {
        
        let html = '';

        listaDatos.forEach(doc => {
            const alumno = doc.data()
            html += `
                <h2>DATOS DE ALUMNOS: </h2>            
                <div class="contenedor sombra"> 
                    <h3>Nombre: </h3>
                    <h4>${alumno.nombre}</h4>
                    <h3>Apellido Paterno: </h3>
                    <h4> ${alumno.apellidoPaterno}</h4>
                    <h3>Apellido Materno: </h3>
                    <h4> ${alumno.apellidoMaterno}</h4>
                    <h3>Carrera: </h3>
                    <h4> ${alumno.carrera}</h4>
                    <h3>Matricula: </h3>
                    <h4> ${alumno.matricula}</p>
                    <button class="btnEliminar" data-id="${doc.id}" > ELIMINAR </button>
                    <button class="btnActualizar" data-id="${doc.id}" > ACTUALIZAR </button>
                </div>
            `;       
        });
    
        contenedor.innerHTML = html;

        const btnEliminar = contenedor.querySelectorAll('.btnEliminar');
        btnEliminar.forEach(btn => {
            btn.addEventListener('click', ({target: { dataset }}) => {
                deleteAlumnos(dataset.id);
            })
        });

        const btnActualizar = contenedor.querySelectorAll('.btnActualizar');
        btnActualizar.forEach(btn => {
            btn.addEventListener('click', async(e) => {
                const doc = await getALumno(e.target.dataset.id);
                const alumno = doc.data();

                formulario['nombre'].value = alumno.nombre;
                formulario['apellidoPaterno'].value = alumno.apellidoPaterno;
                formulario['apellidoMaterno'].value = alumno.apellidoMaterno;
                formulario['carrera'].value = alumno.carrera;
                formulario['matricula'].value = alumno.matricula;

                editStatus = true;
                id = doc.id;
            })
        })
    });


});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = formulario['nombre'].value;
    const apellidoPaterno = formulario['apellidoPaterno'].value;
    const apellidoMaterno = formulario['apellidoMaterno'].value;
    const carrera = formulario['carrera'].value;
    const matricula = formulario['matricula'].value;

   if(!editStatus) {
    saveDate(nombre, apellidoPaterno, apellidoMaterno, carrera, matricula);
   } else {
    updateAlumno(id, {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        carrera: carrera,
        matricula: matricula
    });

    editStatus = false;
   }
    
    formulario.reset();
})