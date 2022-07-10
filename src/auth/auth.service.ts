import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

// BOILER CODE
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository
    ) {}
}
