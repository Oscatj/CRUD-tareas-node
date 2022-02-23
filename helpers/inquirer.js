const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type : 'list',
        name : 'opcion',
        message : '¿Qué quieres hacer?',  
        choices : [
            {
                value: '1',
                name: `${'1'.blue} Crear lista`
            },
            {
                value: '2',
                name: `${'2'.blue} Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.blue} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.blue} Completar tareas`
            },
            {
                value: '6',
                name: `${'6'.blue} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.blue} Salir`
            },

        ]
    }
];

const inquirerMenu = async() =>{

    console.clear();
    console.log('============================='.green);
    console.log('   Elija la opción deseada');
    console.log('============================= \n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}
const pausa = async() =>{

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.red} para continuar`
        }
    ]

    await inquirer.prompt(question);        
}

const leerInput = async (message) =>{
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0){
                    return 'Debe ingresar un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt (question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map ( (tarea, i) =>{
        const idx = 1 + i;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmacion = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
 
    const choices = tareas.map ( (tarea, i) =>{
        const idx = 1 + i;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionadas: ',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar,
    confirmacion, 
    mostrarListadoChecklist
}