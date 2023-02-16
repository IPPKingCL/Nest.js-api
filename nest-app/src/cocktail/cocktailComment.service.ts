import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AlchoRecipteRepository } from "./repository/AlchoRecipe.repository";
import { CocktailRepository } from "./repository/Cocktail.repository";
import { JuiceRepository } from "./repository/Juice.repository";
import { JuiceRecipeRepository } from "./repository/JuiceRecipe.repository";
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { RatingRepository } from "./repository/Rating.repository";
import { CocktailCommentRepository } from "./repository/CocktailComment.repository";
import { UserRepository } from "./repository/User.repository";
import { FavoriteRepository } from "src/user/repository/favorite.repository";
import { CocktailCommentEntity } from "src/entities/cocktailComment.entity";

@Injectable()
export class CocktailCommentService{
    private readonly logger = new Logger(CocktailCommentService.name);
    constructor(
        private jwtService: JwtService,
        private readonly cockRepository: CocktailRepository,
        private readonly alchoRecipeRepository: AlchoRecipteRepository,
        private readonly juiceRecipeRepository: JuiceRecipeRepository,
        private readonly juiceRepository: JuiceRepository,
        private readonly alchoRepository: alchoRepository,
        private readonly ratingRepository: RatingRepository,
        private readonly cocktailCommentRepository: CocktailCommentRepository,
        private readonly userRepository: UserRepository,
        private readonly favoriteRepository: FavoriteRepository
    ) { }

    /***********************칵테일 댓글***********************/
    async commentInsert(commentDto, header): Promise<object> {
        try {
            const token = this.jwtService.decode(header);
            const cocktailCommentEntity = new CocktailCommentEntity();

            cocktailCommentEntity.contents = commentDto.contents;
            cocktailCommentEntity.dateTime = new Date();
            cocktailCommentEntity.nickname = token['nickname'];
            cocktailCommentEntity.isDeleted = false;
            cocktailCommentEntity.cocktail = commentDto.boardId;
            cocktailCommentEntity.user = token['id'];

            await this.cocktailCommentRepository.insert(cocktailCommentEntity);

            return { success: true };
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "댓글 삽입 중 에러 발생" };
        }
    }

    async commentAll(id: number) {
        try {
            const res = await this.cocktailCommentRepository.createQueryBuilder('cocktailComment')
                .leftJoinAndSelect('cocktailComment.user', 'user.id')
                .where("cocktailId=:cocktailId", { cocktailId: id })
                .andWhere("isDeleted=false")
                .getMany();
            return res;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "댓글 조회 중 에러 발생" };
        }
    }

    async deleteComment(deleteComment, header: string): Promise<object> {
        try {

            const token = this.jwtService.decode(header);
            if (deleteComment.userId == (token['id'])) {
                await this.cocktailCommentRepository.createQueryBuilder()
                    .update('cocktailComment')
                    .set({ isDeleted: true })
                    .where("id=:id", { id: deleteComment.id })
                    .execute();
                return { success: true };
            } else {
                return { success: false, msg: 'fail' };
            }
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "댓글 삭제 실패" };
        }
    }
}