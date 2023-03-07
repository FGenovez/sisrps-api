import { Injectable } from '@nestjs/common';


export type User = any;

@Injectable()
export class UsersService {
  
  private readonly users = [
    {
      userId: 1,
      username: 'fgenovez',
      password: 'enero2020',
      email: 'spusersismch@gmail.com',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      email: 'emailjohn@gmail.com',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}