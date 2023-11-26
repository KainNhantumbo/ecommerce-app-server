import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getSatus() {
    return { code: 'OK', message: 'Server is running.' };
  }
}
