import { Controller, HttpStatus, Get, HttpCode, Post, Request, Body, ValidationPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { Auth } from '../shared/decorater/auth.decorator';
import { ArticleDataDto } from './dto/resource.dto';

@ApiTags('Articles/Resource Area')
@Controller('resources')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}

    @ApiOperation({ summary: 'Get All Articles' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Articles List:' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'No Articles Found' })
    @Get('articles')
    getAllArticles(): Promise<{}> {
        return this.resourcesService.getAllArticles();
    }

    @ApiOperation({ summary: 'Get All Articles For A User' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Get All Articles For A User' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'No Articles Found' })
    @Get('user-articles')
    @Auth()
    getAllArticlesForAUser(@Request() req): Promise<{}> {
        return this.resourcesService.getAllArticlesForAUser(req.user);
    }

    @ApiOperation({ summary: 'Add an Article' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Add an Article' })
    @ApiConflictResponse({
        status: HttpStatus.CONFLICT,
        description: 'Article already exist.',
    })
    @ApiBadRequestResponse({status: HttpStatus.BAD_REQUEST, description: 'Error while creating an article.' })
    @Post('add-article')
    @Auth()
    addArticle(
        @Body(ValidationPipe) data: ArticleDataDto,
    ): Promise<{}> {
        return this.resourcesService.addArticle(data)
    }
    
    @ApiOperation({ summary: 'Create New Read Article For A User' })
    @ApiResponse({ status: HttpStatus.OK, description: 'New Read Article For A User Created' })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Article or User not found.',
    })
    @ApiBadRequestResponse({status: HttpStatus.BAD_REQUEST, description: 'Error while creating User Read Article.' })
    @Post('add-read-user-article')
    @Auth()
    addReadArticleForUser(
        @Query('articleId') articleId: string,
        @Request() req,
    ): Promise<{}> {
        return this.resourcesService.addReadArticleForUser(articleId, req.user)
    }
}
