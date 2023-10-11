import { Controller, HttpStatus, ValidationPipe, HttpCode, Body, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication For User')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({ status: HttpStatus.OK, description: 'User Login', })
    @ApiUnauthorizedResponse({  status: HttpStatus.UNAUTHORIZED , description: 'Unauthorized' })
    @ApiForbiddenResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
    @ApiBadRequestResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body(ValidationPipe) data: AuthDto) {
        return this.authService.userLogin(data);
    }
}
