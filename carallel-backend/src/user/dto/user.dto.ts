import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmptyString } from '../../shared/decorater/isNotEmptyString.decorator'
import { IsNotEmptyNumber } from '../../shared/decorater/isNotEmptyNumber.decorator'
import { IsNotEmptyEmail } from 'src/shared/decorater/isNotEmptyEmail.decorater'

export class UserDto {
    @ApiProperty({
        example: 'firstname',
        description: 'firstname',
    })
    @IsNotEmptyString()
    firstname: string

    @ApiProperty({
        example: 'lastname',
        description: 'lastname',
    })
    @IsNotEmptyString()
    lastname: string

    @ApiProperty({
        example: '1234567890',
        description: 'phone',
        required: true,
    })
    @IsNotEmptyNumber()
    phone: string

    @ApiProperty({
        example: 'email@gmail.com',
        description: 'email',
    })
    @IsNotEmptyEmail()
    email: string

    @ApiProperty({
        example: 'username',
        description: 'username',
    })
    @IsNotEmptyString()
    username: string

    @ApiProperty({
        example: 'password',
        description: 'password',
    })
    @IsNotEmptyString()
    password: string
}
