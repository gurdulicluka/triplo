import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique("UQ_EMAIL", ["email"])
@Unique("UQ_USERNAME", ["username"])
class AuthUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar" })
	username: string;

	@Column({ type: "varchar" })
	email: string;

	@Column({ type: "varchar" })
	password: string;

	@UpdateDateColumn()
	updatedDate: Date;

	@CreateDateColumn()
	createdDate: Date;
}

export { AuthUser };
