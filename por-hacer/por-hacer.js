const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else
        return false;


}

const getListado = (completado) => {

    cargarDB();
    if (listadoPorHacer.length == 0)
        return [{ descripcion: 'No hay tarea ', completado: false }];


    if (completado === 'all') {
        return listadoPorHacer;
    } else {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === completado);
        if (nuevoListado.length != listadoPorHacer.length)
            return nuevoListado;
    }

    return listadoPorHacer;
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else
        return false;

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}


module.exports = { crear, getListado, actualizar, borrar }