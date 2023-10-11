import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmptyString } from '../../shared/decorater/isNotEmptyString.decorator'

export class AuthDto {
    @ApiProperty({
        example: 'username',
        description: 'Username',
        required: true,
    })
    @IsNotEmptyString()
    username: string

    @ApiProperty({ 
        example: '123456', 
        description: 'Password' 
    })
    @IsNotEmptyString()
    password: string
}
