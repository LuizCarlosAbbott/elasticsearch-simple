import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  getHello(): Promise<any> {
    return this.searchService.getHello();
  }
}
