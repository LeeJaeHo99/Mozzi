import { IsString, Length } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @Length(2, 12)
    nickname!: string;
    
    @IsString()
    @Length(2, 12)
    hiddenNickname!: string;
    
    @IsString()
    profileImgUrl!: string | null;
    
    @IsString()
    hiddenProfileEmoji!: string;
    
    @IsString()
    @Length(2, 12)
    description!: string | null;
}
