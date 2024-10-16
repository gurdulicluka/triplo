import { db } from "../config/database";
import { NotFoundError } from "../dtos/error/CustomError";
import { AuthUser } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(AuthUser);

	/* ------------------------------- CREATE USER ------------------------------ */
	async createUser(data: Partial<AuthUser>): Promise<AuthUser> {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	}

	/* -------------------------------- GET USER -------------------------------- */

	// By id
	// async getUserById(id: number): Promise<AuthUser | null> {
	// 	const result = await this.userRepository.findOneBy({ id });
	// 	if (!result) {
	// 		throw new NotFoundError("AuthUser not found");
	// 	}
	// 	return result;
	// }

	// By email
	async getUserByEmail(email: string): Promise<AuthUser | null> {
		const result = await this.userRepository.findOneBy({ email });
		if (!result) {
			throw new NotFoundError("User not found");
		}
		return result;
	}

	/* ------------------------------ GET ALL USERS ----------------------------- */
	// async getAllUsers(): Promise<User[]> {
	// 	return this.userRepository.find();
	// }

	/* ------------------------------- UPDATE USER ------------------------------ */
	async updateUser(
		id: number,
		data: Partial<AuthUser>,
	): Promise<AuthUser | null> {
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
