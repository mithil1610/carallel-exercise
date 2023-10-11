import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ArticlesEntity } from './entity/resource.entity';
import { UserArticleEntity } from './entity/user-article.entity';
import { HelperService } from 'src/shared/helper/helper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity, UserEntity, ArticlesEntity, UserArticleEntity]),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, HelperService]
})
export class ResourcesModule {}
