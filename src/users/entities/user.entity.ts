import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId?: number
    @Column({ unique: true })
    username: String
    @Column()
    password: String
    @Column({ unique: true })
    email: String
    @Column()
    name: String
}