import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import contextService = require('request-context')
import { AuthEntity } from '../entity/auth.entity'
import { UserEntity } from '../../user/entity/user.entity'
import 'dotenv/config'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        if (!request.headers.authorization) {
            return false
        }
        const decoded = await this.validateToken(request.headers.authorization)
        request.user = decoded
        const login = await this.authRepository.findOne({
            where: { id: request.user.id },
        })
        if (!login) {
            throw new HttpException(
                'User Token Not Valid',
                HttpStatus.FORBIDDEN
            )
        }
        const user = await this.userRepository.findOne({
            where: { login_id: login.id },
        })

        const data = { loginId: login.id, user: user }
        request.user = data
        contextService.set('request:user', user)
        return true
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN)
        }
        const token = auth.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            return decoded
        } catch (err) {
            const message = 'Token error:' + (err.messgae || err.name)
            throw new HttpException(message, HttpStatus.FORBIDDEN)
        }
    }
}
