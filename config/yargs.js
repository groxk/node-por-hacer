const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const filtro = {
    default: 'all',
    alias: 'f',
    desc: 'Marca como completado o pendiente la tarea'
}
const argv = require('yargs')
    .command('crear',
        'Crear un elemento por hacer', { descripcion })
    .command('actualizar',
        'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar',
        'Elimina una tarea', { descripcion })
    .command('listar',
        'lista tareas', { filtro })
    .help().argv;

module.exports = {
    argv
}