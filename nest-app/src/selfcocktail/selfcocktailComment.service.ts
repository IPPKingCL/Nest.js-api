import { Injectable, Logger } from "@nestjs/common";
import { SelfCocktailRepository } from "./repository/selfCocktail.repository";

@Injectable()
export class SelfCocktailCommentService{
    private readonly logger = new Logger(SelfCocktailCommentService.name);
    constructor(
        private readonly selfCocktailCommentRepository : SelfCocktailRepository,

    ){}
}