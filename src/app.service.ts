import { Injectable } from '@nestjs/common';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): HealthcheckDto {
    return { date: new Date().toISOString(), status: 'OK' };
  }
}
