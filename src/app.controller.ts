import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { LocalAuth } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(LocalAuth)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
