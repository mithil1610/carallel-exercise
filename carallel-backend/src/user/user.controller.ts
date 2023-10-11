import { Controller, ValidationPipe, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('User Creation')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Create New User' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'User Created' 
    })
    @ApiConflictResponse({
        status: HttpStatus.CONFLICT,
        description: 'User Deatails already exist',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad Request',
    })
    @Post('register')
    createUser(
        @Body(ValidationPipe) userDto: UserDto
    ) {
        return this.userService.createUser(userDto)
    }
}
