import { Module } from '@nestjs/common';
import { CocktailService } from './cocktail.service';

@Module({
  providers: [CocktailService]
})
export class CocktailModule {}
