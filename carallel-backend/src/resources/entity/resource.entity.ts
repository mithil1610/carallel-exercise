import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Generated,
} from 'typeorm';

@Entity('articles')
export class ArticlesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    auid: string

    @Column({ type: 'varchar' })
    articleTitle: string

    @Column({ type: 'text' })
    article: string
    
    @Column({ type: 'varchar' })
    author: string

    @CreateDateColumn({ name: 'createdAt', nullable: false })
    createdAt: Date
}
