import { IsString, MinLength, MaxLength, Matches } from "class-validator"

export class AuthCredentialsDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;
	
	@IsString()
	@MinLength(8)
	@MaxLength(32)
// 	Regular Expression ensuring password containts
// 	At least 1 upper case letter
// 	At least 1 lower case letter
// 	At least 1 number or special character
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password should contain a lower case, upper case and a number or special character" })
	password: string;
}