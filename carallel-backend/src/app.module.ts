import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/entity/auth.entity';
import { UserEntity } from './user/entity/user.entity';
import { ResourcesModule } from './resources/resources.module';
import 'dotenv/config';
import { ArticlesEntity } from './resources/entity/resource.entity';
import { UserArticleEntity } from './resources/entity/user-article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 3306,
      // port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [AuthEntity, UserEntity, ArticlesEntity, UserArticleEntity],
      database: 'carallel',
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
