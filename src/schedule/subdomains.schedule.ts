// src/schedule/subdomains.schedule.ts

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubdomainsService } from '../subdomains/subdomains.service';

@Injectable()
export class SubdomainsSchedule {
  constructor(private readonly subdomainsService: SubdomainsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_6AM, {
    timeZone: 'Asia/Dhaka',
  })
  async handleCron(): Promise<void> {
    const subdomain = await this.subdomainsService.generateSubdomain();
    await this.subdomainsService.updateNginxConfig(subdomain);
    await this.subdomainsService.sendNotification(subdomain);
  }
}
