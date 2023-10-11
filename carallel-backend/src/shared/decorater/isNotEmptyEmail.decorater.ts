import { applyDecorators, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { IsNotEmpty, ValidationArguments, IsEmail } from 'class-validator';

export function IsNotEmptyEmail() {
    return applyDecorators(
        // Is Not Empty
        IsNotEmpty({
            message: (args: ValidationArguments) => {
                if (
                    args.value !== undefined ||
                    args.constraints !== undefined ||
                    args.value !== null ||
                    args.value.length === 0
                ) {
                    throw new BadRequestException(`${args.property} Field required`);
                } else {
                    throw new InternalServerErrorException();
                }
            },
        }),
        //Is Email
        IsEmail(
            {},
            {
                message: (args: ValidationArguments) => {
                    Logger.log(args);
                    throw new BadRequestException('Invalid Email');
                },
            },
        )
    );
}