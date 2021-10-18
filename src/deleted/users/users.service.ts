import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Connection } from 'typeorm';
import { User } from './user.entity';
import { encryptPassword, makeSalt } from '../utils/cryptogram';
import { Salt } from './salt.entity';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  //   private saltRepository: Repository<Salt>,
  // ) {}
  @InjectRepository(User)
  private usersRepository;
  @InjectRepository(Salt)
  private saltRepository;
  constructor(
    // private readonly mailerService: MailerService,
    private connection: Connection,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneByUsername(username: string): Promise<User[]> {
    return this.usersRepository.find({ where: { username } });
  }
  findAllByUsername(username: string): Promise<User[]> {
    username = '%' + username + '%';
    return this.usersRepository.find({
      where: { username: Like(username) },
    });
  }
  findOneSalt(u_id: number): Promise<Salt> {
    return this.saltRepository.findOne({ where: { u_id } });
  }
  async update(user: User, u_id: string): Promise<any> {
    if (user.password) {
      const salt = makeSalt();
      user.password = encryptPassword(user.password, salt);
      // user.salt = salt;
      try {
        await this.connection.transaction(async (manager) => {
          await manager.update(User, u_id, user);
          await manager.update(Salt, u_id, { salt: salt });
        });
        return {
          code: 200,
          msg: 'Success',
        };
      } catch (error) {
        return {
          code: 503,
          msg: `Service error: ${error}`,
        };
      }
    } else {
      const res = await this.usersRepository.update({ u_id }, user);
      if (res.affected === 1) {
        return {
          code: 200,
          msg: 'Success',
        };
      } else {
        return {
          code: 403,
          msg: 'failed',
        };
      }
    }
  }

  async remove(u_id: number): Promise<void> {
    await this.usersRepository.update(u_id, { is_deleted: true });
  }

  /**
   * register
   * @param user
   */
  async register(user: User): Promise<any> {
    const result = await this.usersRepository.find({
      where: { email: user.email },
    });
    if (result.length > 0) {
      return {
        code: 400,
        msg: 'User already exist',
      };
    }
    const salt = makeSalt();
    user.password = encryptPassword(user.password, salt);
    try {
      try {
        await this.connection.transaction(async (manager) => {
          const res = await manager.save(User, user);
          await manager.insert(Salt, {
            u_id: res.u_id,
            salt: salt,
          });
        });
        return {
          code: 200,
          msg: 'Success',
        };
      } catch (error) {
        return {
          code: 503,
          msg: `Service error: ${error}`,
        };
      }
      // const userRes = await this.usersRepository.save(user);
      // // console.log(userRes);
      // await this.saltRepository.save({ u_id: userRes.u_id, salt: salt });
      // return {
      //   code: 200,
      //   msg: 'Success',
      // };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
