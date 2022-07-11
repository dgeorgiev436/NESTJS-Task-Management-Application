import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto"

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
}
