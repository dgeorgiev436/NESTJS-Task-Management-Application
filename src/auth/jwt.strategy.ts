import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserRepository } from "./users.repository" 
import { InjectRepository } from "@nestjs/typeorm"
import { JwtPayload } from "./jwt-payload.interface"
import { User } from "./user.entity"
import { UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private usersRepository: UserRepository,
		private configService: ConfigService
	) {
		super({
			secretOrKey: configService.get("JWT_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		});
	}
	
	async validate(payload: JwtPayload): Promise<User> {
		const { username } = payload;
		const user: User = await this.usersRepository.findOne({ username });
// 		If user does not exist
		if(!user){
			throw new UnauthorizedException();
		}
		
		return user;
		
	}
}
