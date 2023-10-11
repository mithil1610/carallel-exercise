import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(data: UserDto): Promise<{}> {
        const {
            username,
            password,
            firstname,
            lastname,
            phone,
            email,
        } = data

        const checkUsername = await this.authRepository.findOne({
            where: { username: username },
        })
        if (checkUsername) {
            throw new HttpException(
                'Username already exist.',
                HttpStatus.CONFLICT
            )
        }
        
        const checkUsername1 = await this.userRepository.findOne({
            where: { username: username },
        })
        if (checkUsername1) {
            throw new HttpException(
                'Username already exist.',
                HttpStatus.CONFLICT
            )
        }

        const checkEmail = await this.userRepository.findOne({
            where: { email: email },
        })
        if (checkEmail) {
            throw new HttpException(
                'Email already exist.',
                HttpStatus.CONFLICT
            )
        }

        await this.userRepository.manager.transaction(
            async transactionalEntityManager => {
                const loginData = { username, password }
                const createLogin = await this.authRepository.create({
                    ...loginData,
                })
                const saveLogin = await transactionalEntityManager.save(
                    createLogin
                )

                if (!saveLogin) {
                    throw new HttpException(
                        'Error while registrating user.',
                        HttpStatus.BAD_REQUEST
                    )
                }
                const userData = {
                    username,
                    firstname,
                    lastname,
                    phone,
                    email,
                }
                const createUser = await this.userRepository.create({
                    ...userData,
                    loginId: saveLogin,
                })

                const saveUser = await transactionalEntityManager.save(
                    createUser
                )

                if (!saveUser) {
                    throw new HttpException(
                        'Error while registrating user.',
                        HttpStatus.BAD_REQUEST
                    )
                }
            }
        )

        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully.',
        }
    }
}
