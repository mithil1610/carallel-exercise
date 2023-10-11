import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    Generated,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity('login')
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Generated('uuid')
    luid: string

    @Column({ type: 'varchar', unique: true })
    username: string

    @Column('text')
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 15)
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password)
    }
}
