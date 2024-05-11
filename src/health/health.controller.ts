import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  public health(): string {
    return `Health: Server instance is healthy with proces id ${process.pid} on ${this.getCurrentDate()}`;
  }

  @Get('env')
  public env(): string {
    return `This is the ${process.env.NODE_ENV} environment.`;
  }

  private getCurrentDate(): string {
    return new Date().toLocaleDateString(undefined, {
      day: '2-digit',
      weekday: 'short',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
