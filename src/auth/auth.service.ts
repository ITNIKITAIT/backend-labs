import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { JwtPayloadDto } from './dto/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
    );

    return {
      accessToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (user) {
      throw new UnauthorizedException('This email is already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      },
      omit: { password: true },
    });

    const { accessToken, refreshToken } = await this.generateTokens(
      newUser.id,
      newUser.email,
    );

    return {
      accessToken,
      refreshToken,
      user: newUser,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const payload = this.jwtService.verify<JwtPayloadDto>(refreshToken, {
      secret: jwtConstants.refresh_secret,
    });
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user || user.id !== userId) {
      throw new Error('Invalid refresh token');
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(payload.userId, payload.email);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    };
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.access_secret,
          expiresIn: '30sec',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.refresh_secret,
          expiresIn: '1m',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
