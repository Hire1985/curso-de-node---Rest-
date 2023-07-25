const Rols = require('../models/role');
const Usuario = require('../models/usuarios');

const esRoleValido = async(role = '') => {
    const existeRole = await Rols.findOne({role});
    if (!existeRole) {
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {
    const emailInUse = await Usuario.findOne({correo});
    if(emailInUse){
       throw new Error (`El correo ${correo}, ya existe`)
    }

}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
       throw new Error (`El ID ${id}, no existe`)
    }

}


module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}