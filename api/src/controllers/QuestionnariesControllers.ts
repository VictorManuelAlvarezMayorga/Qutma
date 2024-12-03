import { Request, Response } from "express";
import { QuestionnairesModels } from "../models/QuestionnariesModels";
import mongoose from "mongoose";
import jwt, { TokenExpiredError } from "jsonwebtoken";


export const createQuestionnaries = async (req: Request, res: Response):
    Promise<void> => {
    try {
        //validacion que los datos existen
        const title = req.body.title
        const description = req.body.description
        const UserId = req.body.UserId

        //Validar que no falten datos para la creacion de un cuestionario
        if (!title || !description || !UserId) {
            res.status(400).json({
                msg: 'Faltan datos para la creacion de cuestionario'
            })
            return
        }

        const questionnare = await QuestionnairesModels.create({
            title,
            description,
            UserId
        })

        res.status(200).json({ msg: "Cuestionario creado con exito" })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear tu cuestionario'
        })
        return
    }
}

export const updatesQuestionnaries = async (req: Request, res: Response): Promise<any> => {
    try {
        const questionnarieData = { title: req.body.title, questionnarieId: req.body.questionnarieId, description: req.body.description };

        const ObjectId = mongoose.Types.ObjectId;

        //Verificar que el questionario existe 
        const ObjectId = mongoose.Types.ObjectId;
        if (!ObjectId.isValid(questionnarieData)) { res.status(400).json({
                msg: "El cuestionario no existe.", });
            return;
        }

        //Update
        const updatedQuestionnarie = await questionnarieData.findByIdAndUpdate(
            questionnarieId, { title, description }
          );
          const token = jwt.sign(
            JSON.stringify(updatedQuestionnarie), "Pocoyo");
          res.status(200).json({
            msg: "El cuestionario fue actualizado",
            token,
          });

          //Error
        } catch (error) {
          res.status(500).json({
            msg: "Hubo un error al actualizar el cuestionario.",
          });
        }
      };

      //Delete
      export const deleteQuestionnarie = async ( req: Request, res: Response): Promise<void> => {
        try {
          const { questionnaireId } = req.body;
          if (!questionnaireId) {
            res.status(400).json({
              msg: "Ingresa el id del cuestionario para poderlo borrar.",
            });
          }
          //Valida se trata de un ObjectId
          const ObjectId = mongoose.Types.ObjectId;
          if (!ObjectId.isValid(questionnaireId)) {
            res.status(400).json({
              msg: "Hay un error con el id del cuestionario.",
            });
            return;
          }
          const deleteQuestionnarie = await QuestionnairesModels.findByIdAndDelete(
            questionnaireId
          );

          //El cuestionario no existe
          if (!deleteQuestionnarie) {
            res.status(400).json({
              msg: "El cuestionario no existe",
            });
            return;
          }
          const token = jwt.sign(JSON.stringify(deleteQuestionnarie), "pocoyiyo");
          res.status(200).json({
            msg: "El cuestionario ha sido eliminado",
            token,
          });
        } catch (error) {
          res.status(500).json({
            msg: "Hubo un error al intentar eliminar el cuestionario",
          });
    }

}