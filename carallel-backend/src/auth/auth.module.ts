import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import 'dotenv/config';
import { UserArticleEntity } from 'src/resources/entity/user-article.entity';
import { ArticlesEntity } from 'src/resources/entity/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity, ArticlesEntity, UserArticleEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
