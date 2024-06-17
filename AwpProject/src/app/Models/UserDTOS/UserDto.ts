import { RolDto } from "../RolDTOS/RolDto";

export class UserDto{
    constructor
    (
        public Id: string = '',
        public UserName:string = '',
        public Email: string = '',
        public Rol: RolDto[] = []//To allow fefault values 
    ){}
    
};