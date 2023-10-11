import { applyDecorators, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { IsNotEmpty, ValidationArguments, IsNumberString } from 'class-validator';

export function IsNotEmptyNumber() {
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
        // Is String args.value !== /^[A-Za-z]+$/
        // IsNumberString({
        //     message: (args: ValidationArguments) => {
        //         if (
        //             args.value !== /^[A-Za-z]+$/
        //         ) {
        //             throw new BadRequestException(`${args.property} Field Must be NumberString`);
        //         } else {
        //             throw new InternalServerErrorException();
        //         }
        //     },
        // }),
    );
}