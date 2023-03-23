import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("test")
  async test_endpoint() {
    try {
      const { Guardar_AbsentismoResult } = await this.appService.test_endpoint()
      return { message:Guardar_AbsentismoResult.Mensaje }
    } catch (error) {
      return { error }
    }
  }
}
