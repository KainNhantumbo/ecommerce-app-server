import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getStatus() {
    return { statusCode: 200, message: 'Server is running...' };
  }
}
