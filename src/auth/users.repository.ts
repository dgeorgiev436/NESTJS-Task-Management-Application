import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto"
import {InternalServerErrorException, ConflictException} from "@nestjs/common"
import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
// 	Create new user
	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		
		const { username, password } = authCredentialsDto;
		
// 		hash password
		const salt = await bcrypt.genSalt(); // Generate salt
		const hashedPassword = await bcrypt.hash(password, salt) // Generate hash
		
		const newUser = this.create({username, password: hashedPassword});
		
		try{
			await this.save(newUser);	
		}catch(err){
			if(err.code === "23505"){ // duplicate username
				throw new ConflictException("Username already exists")
			}else{
				throw new InternalServerErrorException()
			}
		}
	}
}