import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { AuthUser } from "./user.model";

@Entity({ name: "REFRESH_TOKEN" })
@Unique("UQ_TOKEN", ["token"])
class RefreshToken {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => AuthUser, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	userId: number;

	@Column({ type: "varchar" })
	token: string;

	@CreateDateColumn()
	createdDate: Date;
}

export { RefreshToken };
