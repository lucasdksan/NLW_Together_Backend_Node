import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserServices {
    async execute({ email, password }: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne({
            email
        });
        if(!user){
            throw new Error("Email/Password incorrect");
        }
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }
        const token = sign({
            email: user.email},
            "226d7620b73e18dc58631c6ca5e70938",
            {
                subject: user.id,
                expiresIn: "1d"
            });
        return token;
    }
}

export { AuthenticateUserServices }