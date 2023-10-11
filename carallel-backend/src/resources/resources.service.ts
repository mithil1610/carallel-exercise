import { ConflictException, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ArticlesEntity } from './entity/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { HelperService } from 'src/shared/helper/helper.service';
import { UserArticleEntity } from './entity/user-article.entity';
import { ArticleDataDto } from './dto/resource.dto';

@Injectable()
export class ResourcesService {
    constructor(
        @InjectRepository(UserArticleEntity) private readonly userArticleRepository: Repository<UserArticleEntity>,
        @InjectRepository(ArticlesEntity) private readonly articlesRepository: Repository<ArticlesEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<ArticlesEntity>,
        private readonly helperService: HelperService,
    ) {}

    async getAllArticles(): Promise<{}> {       
        const sql =
            "SELECT JSON_OBJECT('id', a.id, 'articleTitle', a.articleTitle, \n" +
            "'article', a.article, 'author', a.author) as data FROM articles a";

        const allArticles = await this.articlesRepository.query(sql);
        const resData = await this.helperService.jsonDataParser(allArticles);

        if (allArticles.length > 0) {
            return { statusCode: HttpStatus.OK, data: resData };
        }
        throw new HttpException("Articles Not Found", HttpStatus.NOT_FOUND);
    }
    
    async getAllArticlesForAUser(user): Promise<{}> {
        const userData = await this.userRepository.findOne({
            where: { id: user.user.id },
        });
        if(!userData) {
            throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
        }
        
        const sql =
            "SELECT JSON_OBJECT('id', ua.readArticle, 'lastReadAt', ua.lastReadAt, \n" +
            "'articleTitle', a.articleTitle, 'author', a.author, 'article', a.article) \n" +
            'as data FROM `user-article` ua join `articles` a on a.id = ua.readArticle \n' +
            "WHERE ua.readByUser = " + user.user.id;
        
        const userArticles = await this.userArticleRepository.query(sql);
        const resData = await this.helperService.jsonDataParser(userArticles);

        if (userArticles.length > 0) {
            return { statusCode: HttpStatus.OK, data: resData };
        }
        throw new HttpException("No Read Articles Not Found For This User", HttpStatus.NOT_FOUND);
    }

    async addArticle(articleData: ArticleDataDto): Promise<{}> {
        const { articleTitle, article, author } = articleData;

        const findArticle = await this.articlesRepository.findOne({ 
            where: { articleTitle: articleTitle, article: article, author: author },
        });
        if (findArticle) {
            throw new ConflictException(`Article already exist.`);
        }

        const createArticle = await this.articlesRepository.create({
            articleTitle: articleTitle, 
            article: article, 
            author: author,
        });
        const result = await this.articlesRepository.save(createArticle);

        if (result) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Article added successfully',
            };
        }
        throw new HttpException('Error while creating article.', HttpStatus.BAD_REQUEST);
    }
    
    async addReadArticleForUser(articleId, user): Promise<{}> {
        const userData = await this.userRepository.findOne({
            where: { id: user.user.id },
        });
        if(!userData) {
            throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
        }
        
        const findArticle = await this.articlesRepository.findOne({ 
            where: { id: articleId },
        });
        if (!findArticle) {
            throw new HttpException('Article not Found', HttpStatus.NOT_FOUND);
        }
        
        const findUserReadArticle = await this.userArticleRepository.findOne({ 
            where: { read_article: articleId, read_by_user: user.user.id },
        });
        if (findUserReadArticle) {
            findUserReadArticle.read_article = articleId;
            findUserReadArticle.read_by_user = user.user.id;
            const result = await this.userArticleRepository.save(findUserReadArticle);
            if (result) {
                return {
                    statusCode: HttpStatus.OK,
                    message: 'User Read Article updated successfully',
                };
            }
        }

        const createUserReadArticle = await this.userArticleRepository.create({
            read_article: articleId, read_by_user: user.user.id, 
        });
        const result = await this.userArticleRepository.save(createUserReadArticle);
        if (result) {
            return {
                statusCode: HttpStatus.OK,
                message: 'User Read Article added successfully',
            };
        }
        throw new HttpException('Error while creating User Read Article.', HttpStatus.BAD_REQUEST);
    }
}
