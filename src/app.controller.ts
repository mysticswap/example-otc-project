import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('otc-points')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:userAddress')
  getUsersPoints(@Param('userAddress') userAddress: string) {
    return this.appService.getUsersPoints(userAddress);
  }

  @Post('create-market')
  createTokenMarket() {
    return this.appService.createOTCMarket();
  }

  // cron job to run update on all users points
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  updateUserPoints() {
    this.appService.updateAllUsers();
  }
}
