import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './../../user/entity/user.entity';
import { ArticlesEntity } from './resource.entity';

@Entity('user-article')
export class UserArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'readByUser', nullable: true })
    read_by_user: number;
    @ManyToMany(() => UserEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'readByUser' })
    readByUser: UserEntity[];

    @Column({ name: 'readArticle', nullable: true })
    read_article: number;
    @ManyToMany(() => ArticlesEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'readArticle' })
    readArticle: ArticlesEntity[];

    @UpdateDateColumn({ name: 'lastReadAt', nullable: true })
    lastReadAt: Date;
}