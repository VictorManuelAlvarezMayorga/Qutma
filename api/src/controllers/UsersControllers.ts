import { Request, Response } from "express";
import { UserModels } from "../models/UsersModels";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const registerUsers = async (req: Request,res: Response):
Promise<any>=>{
    try {
        //primero validar que los datos existen
        const name = req.body.name
        const email = req.body.email
        const lastNames = req.body.lastNames
        const password = req.body.password
        const rol = req.body.rol
        //Administradores no pueden crear clientes
        if (req.user?.rol === "administrator" && rol === "client"){
            return res.status(400).json({
                msg:'Los administradores no pueden crear clientes'
            })
        }

        //Validar que no falten datos para la creacion de un usuario
        if (!name || !email || !lastNames || !password || !rol){
            return res.status(400).json({
                msg:'Faltan datos para la creacion de usuario'
            })
        }
        //validar que usuario sea admin si el usuario a crear es administrador
        if (rol === 'administrator' && req.user?.rol !='administrator'){
            return res.status(400).json({
                msg:'No puedes crear un administrador si no lo eres tambien'
            })
        }

        /*await UserModels.create({
            name: name, <- //Nos podemos ahorrar codigo eliminando el valor de la propiedad
            lastNames: lastNames,
            email: email,
            password: password,
            rol: rol
        })*/

        const user = await UserModels.create({
            name,
            lastNames,
            email,
            password,
            rol
        })

        const token = jwt.sign(JSON.stringify(user),"shhh");

        res.status(200).json({msg: "Usuario registrado con exito", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hubo un error al crear el usuario'
        })
    }
}

export const signin = async (req: Request, res:Response): Promise<any> =>{
    //correo y contraseña
        //Verificar que el usuario existe
        //si no existe devuelve un error
        //Si existe devuelve un token
        try {
            const user = await UserModels.findOne({email:req.body.email, password:req.body.password})
            
           if(user){
            const token = jwt.sign(JSON.stringify(user),"pocoyo");
            return res.status(200).json({msg: "Sesion iniciada con exito", token})
           }else{
            return res.status(500).json({
                msg:"No hay coincidencias en el sistema"
            })
           }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg:"Hubo un error al iniciar sesion"
            })
        }
    
    }