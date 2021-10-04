import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).end();
    }
    const [, token ] = authToken.split(" ");
    try{
        const { sub } = verify(token,"226d7620b73e18dc58631c6ca5e70938");
        req.user_id = sub as string;
        return next();
    } catch(err){
        return res.status(401).end();
    }

}