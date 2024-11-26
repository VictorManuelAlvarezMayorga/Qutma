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

