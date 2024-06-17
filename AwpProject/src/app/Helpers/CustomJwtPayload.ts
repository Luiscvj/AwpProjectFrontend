import { JwtPayload } from "jwt-decode";
import { RolDto } from "../Models/RolDTOS/RolDto";

export interface CustomJwtPayload extends JwtPayload{
    uid:string;
    username:string;
    email:string;
    roles: RolDto[]

}