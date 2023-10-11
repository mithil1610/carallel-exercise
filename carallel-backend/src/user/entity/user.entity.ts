import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    Generated,
} from 'typeorm'
import { AuthEntity } from '../../auth/entity/auth.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    uuid: string

    @Column({ type: 'varchar' })
    firstname: string

    @Column({ type: 'varchar' })
    lastname: string

    @Column({ type: 'varchar', nullable: false })
    phone: string

    @Column({ type: 'varchar' })
    username: string
    
    @Column({ type: 'varchar' })
    email: string

    @Column({ name: 'loginId' })
    login_id: number;

    @OneToOne(() => AuthEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'loginId' })
    loginId: AuthEntity
}
