import { applyDecorators, SetMetadata, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guard/auth.guard';

export const Decorator = (...args: string[]) => SetMetadata('decorator', args);

export function Auth() {
    return applyDecorators(
        // Authentication & Authorization
        UseGuards(AuthGuard),
        // Swagger Bearer Auth
        ApiBearerAuth(),
        // Swagger Responses
        ApiUnauthorizedResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' }),
        ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
        ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' }),
        ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
    );
}