const { v4: uuidv4 } = require ('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor (desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null; //Esto no es obligatorio ya que no tiene ningún cambio a como se declaró arriba. Es decir que no es necesario, pero es válido.
    }
    
}

module.exports = Tarea;