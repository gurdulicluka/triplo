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
		return result;
	};

	/* ------------------------------- UPDATE USER ------------------------------ */
	public updateUser = async (
		id: number,
		data: Partial<AuthUser>,
	): Promise<AuthUser | null> => {
		await this.userRepository.update(id, data);
		return this.userRepository.findOneBy({ id });
	};

	/* ------------------------------- DELETE USER ------------------------------ */
	public deleteUser = async (id: number): Promise<void> => {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundError(
				"User not found, can't delete if it doesn't exist",
			);
		}
		return;
	};
}

export { UserService };
