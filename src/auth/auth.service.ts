import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { JwtPayloadDto } from './dto/jwt.payload.dto';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private currencyService: CurrencyService,
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

    let defaultCurrencyId: string | null = registerDto.defaultCurrencyId;
    if (defaultCurrencyId) {
      const currency =
        await this.currencyService.getCurrency(defaultCurrencyId);
      if (!currency) {
        throw new NotFoundException(
          `Currency with id ${defaultCurrencyId} not found`,
        );
      }
    } else {
      const currency = await this.currencyService.getDefaultCurrency();
      defaultCurrencyId = currency ? currency.id : null;
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
        defaultCurrencyId,
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

  async updateRefreshToken(refreshToken: string) {
    const payload = this.jwtService.verify<JwtPayloadDto>(refreshToken, {
      secret: jwtConstants.refresh_secret,
    });
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new Error('Invalid refresh token');
    }
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(payload.userId, payload.email);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.access_secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: jwtConstants.refresh_secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
