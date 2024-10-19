import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";
import { RefreshToken } from "./refreshToken.model";

// TODO Error handle the constraints
@Entity({ name: "USER" })
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

	@OneToOne(
		() => RefreshToken,
		(refreshToken) => refreshToken.userId,
	)
	refreshToken: RefreshToken;
}

export { AuthUser };
