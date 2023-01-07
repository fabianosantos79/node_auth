import { Request, Response, NextFunction } from 'express'
import nodeTest from 'node:test'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User'

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next:NextFunction) => {
        //Fazer verificação de Auth
        let success = false;

        if(req.headers.authorization){
            const [ authType, token ] = req.headers.authorization.split(' ')
            if(authType === 'Bearer'){
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    )
                    success = true
                } catch (error) {
                    console.log('Erro:', 'Deu erro no JWT');
                    
                }               
                
            }
        }
        

        if(success){
            next()
        }else{
            res.status(403) //Not authorized
            res.json({ error: "Não autorizado"})
        }

    }
}