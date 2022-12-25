import { Controller, Logger } from '@nestjs/common';
import { CocktailService } from './cocktail.service';

@Controller('cocktail')
export class CocktailController {

    constructor(private readonly cocktailService : CocktailService){}
    private readonly logger = new Logger(CocktailController.name);
}
