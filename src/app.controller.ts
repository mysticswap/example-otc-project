import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:userAddress')
  getUsersPoints(@Param('userAddress') userAddress: string) {
    return this.appService.getUsersPoints(userAddress);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  updateUserPoints() {
    this.appService.updateAllUsers();
  }
}
