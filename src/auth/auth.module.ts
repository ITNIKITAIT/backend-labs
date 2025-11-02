import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { jwtConstants } from './constants';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    CurrencyModule,
    JwtModule.register({
      secret: jwtConstants.access_secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
