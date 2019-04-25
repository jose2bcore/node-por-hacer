const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    //Convertir un objeto a json
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('A ocurrido un error al guardar en el archivo', err);


        console.log("Se ha guardado correctamente los datos en el archivo");
    });
}

const cargaBD = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargaBD();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargaBD();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargaBD();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargaBD();
    let nuevaLista = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevaLista.length) {
        return false;
    } else {
        listadoPorHacer = nuevaLista;
        guardarDB();
        return true;
    }

}





module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}