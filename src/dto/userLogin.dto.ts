import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength,
} from "class-validator";

export class UserLogin {
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @MaxLength(30, { message: "Password must be at most 30 characters long" })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: "Password must contain at least 1 uppercase letter and 1 number",
    })
    password: string;
}
