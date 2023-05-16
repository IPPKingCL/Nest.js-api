import { Injectable, Logger } from "@nestjs/common";
import { SelfCocktailRepository } from "./repository/selfCocktail.repository";
import { JwtService } from "@nestjs/jwt";
import { SelfCocktailCommentEntity } from "src/entities/selfCocktailComment.entity";
import { SelfCocktailCommentRepository } from "./repository/selfCocktailComment.repository";

@Injectable()
export class SelfCocktailCommentService{
    private readonly logger = new Logger(SelfCocktailCommentService.name);
    constructor(
        private readonly selfCocktailCommentRepository : SelfCocktailCommentRepository,
        private jwtService: JwtService,

    ){}


    async commentInsert(commentDto, header): Promise<object>{
        try {
            const token = this.jwtService.decode(header);
            const selfCocktailCommentEntity = new SelfCocktailCommentEntity();

            selfCocktailCommentEntity.contents = commentDto.contents;
            selfCocktailCommentEntity.dateTime = new Date();
            selfCocktailCommentEntity.nickname = token['nickname'];
            selfCocktailCommentEntity.isDeleted = false;
            selfCocktailCommentEntity.selfCocktail = commentDto.boardId;
            selfCocktailCommentEntity.user = token['id'];

            await this.selfCocktailCommentRepository.insert(selfCocktailCommentEntity);

            return { success: true };
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "댓글 삽입 중 에러 발생" };
        }
    }

    async commentAll(id:number){
        try {
            const res = await this.selfCocktailCommentRepository.createQueryBuilder('selfCocktailComment')
                .leftJoinAndSelect('selfCocktailComment.user', 'user.id')
                .where("selfCocktailId=:cocktailId", { cocktailId: id })
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
                await this.selfCocktailCommentRepository.createQueryBuilder()
                    .update('selfCocktailComment')
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