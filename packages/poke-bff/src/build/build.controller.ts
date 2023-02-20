import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {
  constructor(private buildService: BuildService) {}

  @Get()
  helloWorld() {
    return 'Hello World';
  }

  @Post()
  async buildPage(@Body() buildPageDto: BuildPageDto) {
    const { pageName, payload } = buildPageDto;

    switch (pageName) {
      case 'MAIN_PAGE':
        return this.buildService.buildMainPage(payload as MainPagePayload);
      case 'WHO_IS_THAT_POKEMON':
        return await this.buildService.buildWhoIsThatPokemonPage(
          payload as WhoIsThatPokemonPayload
        );

      default:
        break;
    }
  }
}
