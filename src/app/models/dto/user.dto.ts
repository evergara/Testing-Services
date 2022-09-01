import { User } from '../user';

export interface CreateUserDTO extends Omit<User, 'id'> {}
