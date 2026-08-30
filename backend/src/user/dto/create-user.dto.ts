import { IsEnum, IsString, Length } from "class-validator";
import { Gender } from "../enums/user.enum";

export class CreateUserDto {
    @IsString()
    idToken!: string;

    @IsString()
    @Length(2, 12)
    nickname!: string;
    
    @IsString()
    profileImgUrl!: string | null;
    
    @IsEnum(Gender)
    gender!: Gender;
    
    @IsString()
    birthday!: string;
    
    @IsString()
    @Length(2, 12)
    hiddenNickname!: string;
    
    @IsString()
    @Length(2, 12)
    description!: string | null;

    @IsString()
    hiddenProfileEmoji!: string;
}
