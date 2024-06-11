import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiBody } from '@nestjs/swagger';

@Controller('otc-points')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // cron job to run update on all users points
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  updateUserPoints() {
    return this.appService.updateAllUsers();
  }

  @Get('/:userAddress')
  getUsersPoints(@Param('userAddress') userAddress: string) {
    return this.appService.getUsersPoints(userAddress);
  }

  // @Post('create-market')
  // createTokenMarket() {
  //   return this.appService.createOTCMarket();
  // }

  // @Post('add-user')
  // addNewUSer(@Body('user') user: string) {
  //   return this.appService.addUser(user);
  // }
}
