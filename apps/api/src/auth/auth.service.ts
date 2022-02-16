import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async findAll(): Promise<any[]> {
    return await this.userService.findAll();
  }

  async findOne(username: string): Promise<any> {
    return await this.userService.findUsername(username);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async register(user: any) {
    let userData: any;
    userData = await this.userService.findUsername(user.username);
    if (userData) {
      throw new BadRequestException('This username aleady exists');
    }

    await this.userService.createUser(user).catch((e) => console.log(e));

    userData = await this.userService.findUsername(user.username);

    const Token = this.createToken(userData);

    return {
      username: userData.username,
      access_token: Token,
      statusCode: 201,
    };
  }

  async login(user: any) {
    return this.userService.findUsername(user.username).then((userData) => {
      if (!userData) {
        throw new BadRequestException('Check username or password');
      }
      const Token = this.createToken(userData);
      return {
        id: userData.id,
        username: userData.username,
        access_token: Token,
        statusCode: 200,
      };
    });
  }

  createToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      signDate: new Date(),
    };
    return this.jwtService.sign(payload);
  }
}
