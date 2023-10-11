import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entity/auth.entity';
import 'dotenv/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * @method login
     * @description login user and generates JWT token
     * @params data: AuthDto
     * @returns JWT token
     * @author Mithil Patel
    */
    async userLogin(data: AuthDto): Promise<{}> {
        const { username, password } = data
        
        const profile = await this.userRepository.findOne({
            where: { username },
        })
        
        if (!profile) {
            throw new HttpException(
                'Invalid Username/password',
                HttpStatus.BAD_REQUEST
            )
        }
        
        const user = await this.authRepository.findOne({
            where: { id: profile.login_id },
        })

        if (!user) {
            throw new HttpException(
                'Invalid Username/password',
                HttpStatus.BAD_REQUEST
            )
        }

        if (!(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid Password',
                HttpStatus.BAD_REQUEST
            )
        } else {
            const { id } = user
            const payload = { id }
            const accessToken = await this.jwtService.sign(payload)

            return {
                statusCode: HttpStatus.OK,
                message: 'Login successfully',
                token: accessToken,
            }
        }
    }
}
