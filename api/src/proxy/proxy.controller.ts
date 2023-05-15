import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('/proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  post(@Body() data: any) {
    return this.proxyService.proxy(data);
  }
}
