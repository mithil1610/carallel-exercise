import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { UserEntity } from './entity/user.entity';
import { ArticlesEntity } from 'src/resources/entity/resource.entity';
import { UserArticleEntity } from 'src/resources/entity/user-article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity, ArticlesEntity, UserArticleEntity]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
