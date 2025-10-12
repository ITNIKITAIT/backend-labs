import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthcheckDto } from './dto/healthcheck.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('healthcheck')
  healthCheck(): HealthcheckDto {
    return this.appService.getHealth();
  }
}
