const {response} = require('express')
const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')
const generarJWT = require('../helpers/generar-jwt')

const login = async(req, res = response) =>{

    const {correo, password} = req.body

    try {
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos  - Correo'
            })
        }

        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos  - Estado: False'
            })
        }

       



        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos  - password'
            })
        }

        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con su administrador'
        })
        
    }
  
}

module.exports = {
    login
}