require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmacion,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear;

const main = async() =>{

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){ //Cargar tareas
        tareas.cargarTareasFromArray (tareasDB);
    }

    //await pausa();

    do {
    //Imprime el menu y retorna una opcion
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                
            break;

            case '2':
                tareas.listadoCompleto();   
            break;

            case '3':
                tareas.listadoTareasCompletadas(true);
            break;

            case '4': 
                tareas.listadoTareasCompletadas(false);
            break;

            case '5': 
                const ids = await mostrarListadoChecklist ( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;

            case '6': 
                const id = await listadoTareasBorrar (tareas.listadoArr);
                if (id !== '0') {
                const ok = await confirmacion ('¿Seguro que desea borrar?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }
            break;
            
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }
    while( opt !== '0');
}

main(); 