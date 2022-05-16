import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    await this.appService.signUp({
      email: 'noah.janzen@hs-ruhrwest.de',
      name: 'Noah',
    });
  }
}
