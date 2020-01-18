import { User, IMongoUser } from "@models";
import bcrypt from "bcrypt";

export interface IUserDao {
  getOne: (email: string) => Promise<IMongoUser | null>;
  getAll: () => Promise<IMongoUser[]>;
  add: (user: IMongoUser) => Promise<IMongoUser>;
  update: (user: IMongoUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {
  /**
   * @param email
   */
  public async getOne(email: string): Promise<IMongoUser | null> {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   */
  public async getAll(): Promise<IMongoUser[]> {
    try {
      return await User.find();
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param user
   */
  public async add(user: IMongoUser): Promise<IMongoUser> {
    // TODO

    try {
      const newUser = new User({
        name: user.name,
        role: user.role,
        pwdHash: user.pwdHash,
        email: user.email,
      });

      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param user
   */
  public async update(user: IMongoUser): Promise<void> {
    try {
      // tslint:disable-next-line: prefer-const
      let updateUser = await User.findById(user._id);
      if (updateUser != null) {
        updateUser.name = user.name;
        updateUser.role = user.role;
        updateUser.email = user.email;
        updateUser.pwdHash = await bcrypt.hash(user.pwdHash, 10);
        await updateUser.save();
      }
      throw new Error("user not found");
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    try {
      const result = await User.findByIdAndDelete(id);
      if (result == null) {
        throw Error("Could not delete the user");
      }
    } catch (err) {
      throw err;
    }
  }
}
