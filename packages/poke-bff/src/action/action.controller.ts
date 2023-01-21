import { Body, Controller, Post } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDto, WhoIsThatPokemonActionPayload } from './dto/action.dto';

@Controller('action')
export class ActionController {
  constructor(private actionService: ActionService) {}
  @Post()
  action(@Body() actionDto: ActionDto) {
    const { type, payload } = actionDto;

    switch (type) {
      case 'CHECK_ANSWER':
        return this.actionService.checkAnswer(
          payload as WhoIsThatPokemonActionPayload
        );

      default:
        break;
    }
  }
}
