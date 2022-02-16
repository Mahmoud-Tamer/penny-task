import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiProperty()
    @IsString()
    readonly username: string;

    @ApiProperty()
    @IsString()
    readonly password: string;
}
