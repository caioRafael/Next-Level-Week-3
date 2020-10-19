import { ErrorRequestHandler} from 'express';
import { ValidationError } from 'yup'

interface validationErrors{
    [key: string]: string[];
}

const erroHandler:ErrorRequestHandler = (error, request, response, next) =>{

    if(error instanceof ValidationError){
        let errors: validationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        })

        return response.status(400).json({massege: 'Validator fails', errors});
    }
    console.log(error);

    return response.status(500).json({menssage: 'Internal server error'});
};

export default erroHandler;