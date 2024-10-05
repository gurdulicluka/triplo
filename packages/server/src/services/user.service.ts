import { db } from "../config/database";
import { User } from "../models/user.model";

class UserService {
	private userRepository = db.getRepository(User);

	async createUser(data: Partial<User>): Promise<User> {
		const user = this.userRepository.create(data);
		await this.userRepository.insert(user);
		return user;
	}

	async getUserById(id: number): Promise<User | null> {
		return this.userRepository.findOneBy({ id });
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	async updateUser(id: number, data: Partial<User>): Promise<User | null> {
		await this.userRepository.update(id, data);
		return this.userRepository.findOneBy({ id });
	}

	async deleteUser(id: number): Promise<boolean> {
		const result = await this.userRepository.delete(id);
		return result.affected !== 0;
	}
}

export { UserService };
