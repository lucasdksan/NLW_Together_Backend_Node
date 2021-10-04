import { Response, Request } from "express";
import { CreateTagServices } from "../services/CreateTagServices";

class CreateTagControllers {
    async handle(req: Request, res: Response){
        const { name } = req.body;
        const createTagServices = new CreateTagServices();
        const tag = await createTagServices.execute(name);
        return res.json(tag);
    }
}

export { CreateTagControllers };