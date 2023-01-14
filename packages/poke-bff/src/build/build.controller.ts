import { Body, Controller, Post } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildPageDto, WhoIsThatPokemonPayload } from './dto/build-page.dto';

@Controller('build')
export class BuildController {
  constructor(private buildService: BuildService) {}

  @Post()
  async buildPage(@Body() buildPageDto: BuildPageDto) {
    const { pageName, payload } = buildPageDto;

    switch (pageName) {
      case 'WHO_IS_THAT_POKEMON':
        return await this.buildService.buildWhoIsThatPokemonPage(
          payload as WhoIsThatPokemonPayload
        );

      default:
        break;
    }
  }
}
