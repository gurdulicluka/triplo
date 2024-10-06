import { db } from "../config/database";
import { NotFoundError } from "../dtos/error/CustomError";
import { User } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(User);

	/* ------------------------------- CREATE USER ------------------------------ */
	async createUser(data: Partial<User>): Promise<User> {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	}

	/* -------------------------------- GET USER -------------------------------- */
	async getUserById(id: number): Promise<User | null> {
		const result = await this.userRepository.findOneBy({ id });
		if (!result) {
			throw new NotFoundError("User not found");
		}
		return result;
	}

	/* ------------------------------ GET ALL USERS ----------------------------- */
	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	/* ------------------------------- UPDATE USER ------------------------------ */
	async updateUser(id: number, data: Partial<User>): Promise<User | null> {
		await this.userRepository.update(id, data);
		return this.userRepository.findOneBy({ id });
	}

	/* ------------------------------- DELETE USER ------------------------------ */
	async deleteUser(id: number): Promise<void> {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundError(
				"User not found, can't delete if it doesn't exist",
			);
		}
		return;
	}
}

export { UserService };
