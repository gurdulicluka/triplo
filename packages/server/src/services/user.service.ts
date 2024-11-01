import { db } from "../config/database";
import { NotFoundError } from "../dtos/error/CustomError";
import { AuthUser } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(AuthUser);

	/* ------------------------------- CREATE USER ------------------------------ */
	createUser = async (data: Partial<AuthUser>): Promise<AuthUser> => {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	};

	/* -------------------------------- GET USER -------------------------------- */
	getUserByEmail = async (email: string): Promise<AuthUser | null> => {
		const result = await this.userRepository.findOneBy({ email });
		return result;
	};

	/* ------------------------------- UPDATE USER ------------------------------ */
	// TODO Type safety is incomplete, data shouldnt be optional on all, specially columns that are created only in the database
	updateUser = async (id: number, data: Partial<AuthUser>): Promise<AuthUser | null> => {
		await this.userRepository.update(id, data);
		return this.userRepository.findOneBy({ id });
	};

	/* ------------------------------- DELETE USER ------------------------------ */
	deleteUser = async (id: number): Promise<void> => {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundError("User not found, can't delete if it doesn't exist");
		}
		return;
	};
}

export { UserService };
