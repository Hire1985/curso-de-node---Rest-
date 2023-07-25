const { response, request } = require('express')
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')

const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    // const usuarios = await Usuario.find({state: true})
    // .skip(desde)
    // .limit(limite);

    // const total = await Usuario.countDocuments({state: true});

    const [total, usuarios] = await Promise.all([
    Usuario.find({state: true})
    .skip(desde)
    .limit(limite),
    Usuario.countDocuments({state: true})
    ])
    res.json({total, usuarios});
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, role} = req.body
    const usuario = new Usuario({nombre,correo, password, role})
    
    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password.toString(), salt)
    await usuario.save();
    res.json({
        msg:'post API - Controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const {password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10)
        resto.password = bcryptjs.hashSync(password.toString(), salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json( usuario );
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'patch API - Controlador'
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params
    // Borrar físicamente de la BD
    // const usuario = Usuario.findByIdAndDelete(id)
    //Borrar como referencia
    const usuario = await Usuario.findByIdAndUpdate(id, {state:false} )
    res.json({
        usuario
    });
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}