import { Controller } from '@nestjs/common';
import { SubdomainsService } from './subdomains.service';

@Controller('subdomains')
export class SubdomainsController {
  constructor(private readonly subdomainsService: SubdomainsService) {}
}
