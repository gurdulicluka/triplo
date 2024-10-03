import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar" })
	name: string;

	@Column({ type: "varchar", unique: true })
	email: string;

	@Column({ type: "varchar" })
	password: string;

	@Column({ type: "varchar", unique: true })
	phone: string;

	@UpdateDateColumn()
	updatedDate: Date;

	@CreateDateColumn()
	createdDate: Date;
}

export { User };
