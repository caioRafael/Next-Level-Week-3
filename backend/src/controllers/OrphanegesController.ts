import { Request, Response } from "express";
import * as yup from 'yup';
import { getRepository } from 'typeorm';
import Ophanege from '../model/Orphanege';
import orphanegeView from '../views/orphaneges_view';

export default {
    async index(request: Request, response: Response){
        const orphanegesRepository = getRepository(Ophanege);

        const orphaneges = await orphanegesRepository.find({
            relations:['images']
        })

        return response.json(orphanegeView.renderMany(orphaneges));
    },
    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanegesRepository = getRepository(Ophanege);

        const orphanege = await orphanegesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanegeView.render(orphanege));
    },

    async create(request: Request, response: Response){
        const requestImages = request.files as Express.Multer.File[];
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanegeRepository = getRepository(Ophanege);

        const images = requestImages.map(image => {
            return { path: image.filename  }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required().max(350),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.string().required(),
            images: yup.array(yup.object().shape({
                path: yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orphanege = orphanegeRepository.create(data);
    
        await orphanegeRepository.save(orphanege);
    
        return response.status(201).json(orphanege)
    }
}