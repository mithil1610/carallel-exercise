import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmptyString } from '../../shared/decorater/isNotEmptyString.decorator'

export class ArticleDataDto {
    @ApiProperty({
        example: 'article_title',
        description: 'Article Title',
        required: true,
    })
    @IsNotEmptyString()
    articleTitle: string

    @ApiProperty({ 
        example: 'author_name', 
        description: 'Author Name' 
    })
    @IsNotEmptyString()
    author: string
    
    @ApiProperty({ 
        example: 'article_data', 
        description: 'Article Data' 
    })
    @IsNotEmptyString()
    article: string
}
