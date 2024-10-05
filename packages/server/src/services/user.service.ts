import { db } from "../config/database";
import { NotFoundError } from "../dtos/error/CustomError";
import { User } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(User);

	async createUser(data: Partial<User>): Promise<User> {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	}

	async getUserById(id: number): Promise<User | null> {
		const result = await this.userRepository.findOneBy({ id });
		if (!result) {
			throw new NotFoundError({
				details: "testing details",
			});
		}
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	// TODO handle error here, maybe it also return how many are affected or some diffrent error
	async updateUser(id: number, data: Partial<User>): Promise<User | null> {
		await this.userRepository.update(id, data);
		return this.userRepository.findOneBy({ id });
	}

	async deleteUser(id: number): Promise<boolean> {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundError({
				details: "testing details",
			});
		}
		return result.affected !== 0;
	}
}

export { UserService };
