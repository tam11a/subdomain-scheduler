// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SubdomainsModule } from './subdomains/subdomains.module';
import { SubdomainsService } from './subdomains/subdomains.service';
import { SubdomainsSchedule } from './schedule/subdomains.schedule';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), SubdomainsModule],
  providers: [SubdomainsService, SubdomainsSchedule],
})
export class AppModule {}
