import { Request, Response } from "express";
import { AuthenticateUserServices } from "../services/AuthenticateUserServices";

class AuthenticateUserController {
    async handle(req: Request, res: Response){
        const { email, password } = req.body;
        const authenticateUserService = new AuthenticateUserServices();
        const token = await authenticateUserService.execute({email, password});
        return res.json(token); 
    }
}

export { AuthenticateUserController }