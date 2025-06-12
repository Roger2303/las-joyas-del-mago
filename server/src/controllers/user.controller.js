const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const { token } = require('morgan');
const AuthService = require('../services/auth.service');

const register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({
            error:"Faltan campos obligatorios"
        })
    }

    try {
        const userExist = await userModel.findByEmail(email);
        if( userExist) {
            return res.status(409).json({error: "El email ya está registrado"})
        }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({name, email, password: hashedPassword});

    const token = AuthService.generateToken({id: newUser.id, email: newUser.email});
    return res.status(201).json({
        message: "Usuario registrado exitosamente"
    }, token, )        
    } catch (e) {
        console.error("Error en register controller:", e.message);
        return res.status(500).json({error: "Error interno del servidor"});
    }
}

module.exports = {register, }