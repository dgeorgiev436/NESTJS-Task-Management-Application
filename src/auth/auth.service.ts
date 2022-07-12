import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto"
import * as bcrypt from "bcrypt"
import { UnauthorizedException } from "@nestjs/common"

// BOILER CODE
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository
    ) {}
	
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.usersRepository.createUser(authCredentialsDto);
	}
	
	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = await this.usersRepository.findOne({username})
		
		if(user && (await bcrypt.compare(password, user.password))) {
			return "success"
		}else{
			throw new UnauthorizedException("Invalid login credentials")
		}
	}
}
