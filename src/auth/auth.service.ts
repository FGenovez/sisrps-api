import { Injectable } from '@nestjs/common';
import {UsersService} from '../encuestas/users/users.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, email, ...result } = user;//devuelve el usuario excepto los campos password y email
      return result;
    }
    return null;
  }

  async validateUser2(username: string, pass: string): Promise<any> {
    console.log(username)
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, email, ...result } = user;
      console.log(user)
      return result;
    }
    return null;
  }  

  async login(user: any) {
    const payload = { username: user.v_usr, sub: user.v_ccel };
    return this.jwtService.sign(payload, { expiresIn: '1d' })};
}
