import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
  const existingUser = await this.usersService.findByEmail(signUpDto.email);
  if (existingUser) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
  const user = await this.usersService.create({
    ...signUpDto,
    password: hashedPassword,
  });

  const payload = { sub: user.id, username: user.email };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}

  async login(loginDto: LoginDto): Promise<{ access_token: string; userId: number }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user.id,
    };
  }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }
}
 