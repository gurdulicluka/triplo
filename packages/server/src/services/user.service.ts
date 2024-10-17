import { db } from "../config/database";
import { NotFoundError } from "../dtos/error/CustomError";
import { AuthUser } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(AuthUser);

	/* ------------------------------- CREATE USER ------------------------------ */
	public createUser = async (data: Partial<AuthUser>): Promise<AuthUser> => {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	};

	/* -------------------------------- GET USER -------------------------------- */
	public getUserByEmail = async (email: string): Promise<AuthUser | null> => {
		const result = await this.userRepository.findOneBy({ email });
		if (!result) {
			throw new NotFoundError("User not found");
		}
		return result;
	};

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
