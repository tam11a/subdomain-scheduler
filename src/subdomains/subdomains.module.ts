import { Module } from '@nestjs/common';
import { SubdomainsService } from './subdomains.service';
import { SubdomainsController } from './subdomains.controller';

@Module({
  controllers: [SubdomainsController],
  providers: [SubdomainsService],
})
export class SubdomainsModule {}
