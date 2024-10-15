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
@Unique("UQ_NAME", ["name"])
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar" })
	name: string;

	@Column({ type: "varchar" })
	email: string;

	@Column({ type: "varchar" })
	password: string;

	@Column({ type: "varchar" })
	phone: string;

	@UpdateDateColumn()
	updatedDate: Date;

	@CreateDateColumn()
	createdDate: Date;
}

export { User };
