const { resolve } = require('path');

require('colors');

const mostrarMenu = ()=> {

    return new Promise(resolve =>{

        console.clear();
        console.log('============================='.green);
        console.log('   Elija la opción deseada');
        console.log('============================= \n'.green);

        console.log(`${'1'} Crear tarea`);
        console.log(`${'2'} Listar tareas`);
        console.log(`${'3'} Listar tareas completadas`);
        console.log(`${'4'} Listar tareas pendientes`);
        console.log(`${'5'} Borrar tarea`);
        console.log(`${'0'} Salir`);

        //Para recibir informacion de un usuario

        //Creacion de la interface
        const readline = require ('readline').createInterface ({
            input: process.stdin,
            output: process.stdout
        });

        //Haciendo uso de la interface creada
        readline.question('Seleccione una opcion: ', (opt)=> {
            //console.log(opt);
            readline.close();
            resolve(opt);
        });
    });
    
} 

//Para pausar la pantalla mientras esta en una opcion X
const pausa = () =>{

    return new Promise (resolve => {

        const readline = require ('readline').createInterface ({
             input: process.stdin,
             output: process.stdout
        });

        readline.question(`\nPresion ${'Enter'.red} para continuar\n`, (opt)=> { 
            readline.close();
            resolve();
        }); 

    })
        
}
module.exports = {
    mostrarMenu, pausa
}