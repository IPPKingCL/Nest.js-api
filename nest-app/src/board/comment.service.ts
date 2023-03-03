import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CommentEntity } from "src/entities/comment.entity";
import { CommentRecommendEntity } from "src/entities/commentRecommend.entity";
import { CheckAuth } from "src/util/checkAuth";
import { DataSource } from "typeorm";
import { BoardRepository } from "./repository/board.repository";
import { BoardRecommandRepository } from "./repository/boardRecommand.repository";
import { BoardVideoRepository } from "./repository/boardVideo.repository";
import { CommentRepository } from "./repository/comment.repository";
import { CommentRecommendRepository } from "./repository/commentRecommend.repository";
import { ImgRepositoy } from "./repository/img.repository";

@Injectable()
export class CommentService{
    private readonly logger = new Logger(CommentService.name);
    constructor(
        private readonly repository: BoardRepository,  //게시글 
        private readonly coRepository: CommentRepository,
        private readonly imgRepository: ImgRepositoy,
        private readonly recommandRepository: BoardRecommandRepository,
        private jwtService: JwtService,
        private dataSource : DataSource,
        private readonly commentRecommendRepository : CommentRecommendRepository,
        private readonly boardVideoRepository : BoardVideoRepository
    ) { }  //댓글

    
    /*******************comment*******************/
    async insertComment(commentData, header): Promise<object> {

        const token = this.jwtService.decode(header);
        const comment = new CommentEntity();
        comment.contents = commentData.contents;
        comment.dateTime = new Date();
        comment.nickname = token['nickname'];
        comment.isDeleted = false;
        comment.isModified = false;
        comment.board = commentData.boardId;
        comment.user = token['id'];

        try {
            await this.coRepository.insert(comment);
            return { success: true };
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시판 댓글 등록 중 에러 발생" }
        }
    }

    async commentAll(id: number): Promise<CommentEntity[] | object> {
        try {
            return await this.coRepository.createQueryBuilder('comment')
                .leftJoinAndSelect('comment.user', 'user.id')
                .where("boardId=:id", { id: id })
                .andWhere("isDeleted=false")
                .getMany();
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시판 댓글 조회 중 에러 발생" }
        }
    }

    async deleteComment(deleteComment, header: string): Promise<object> {
        try {
            const token = this.jwtService.decode(header);
            const checkAuthUser = CheckAuth.checkAuth(token['id'], deleteComment.userId);
            
            if (checkAuthUser.success) {
                const deleteQuery = await this.deleteCommentQuery(deleteComment.id);
                const res = deleteQuery.success ? {success:true}:{success:false};
                return res;
            } else {
                return { success: false, msg: 'fail' };
            }
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "댓글 삭제 실패" };
        }
    }

    async deleteCommentQuery(commentId){
        try{
            await this.coRepository.createQueryBuilder()
                .update('comment')
                .set({ isDeleted: true })
                .where("id=:id", { id: commentId })
                .execute();

            return {success: true};
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    /**여기도 분리 예정 (이거 안쓰는거 같아서 일단 그대로 둠)*/
    async recommendComment(recommend, header) : Promise<object>{
        try{
            const token = this.jwtService.decode(header);

            const check = await this.checkRecommend(token['id'],recommend.id);
            

            if(check==null){
                const commentRecommendEntity = new CommentRecommendEntity();
                commentRecommendEntity.user = token['id'];
                commentRecommendEntity.comment = recommend.id;
                await this.commentRecommendRepository.save(commentRecommendEntity);

                return {success:true};
            }else{
                if(check['isDeleted']){
                    await this.commentRecommendRepository.createQueryBuilder()
                            .update('commentRecommend')
                            .set({isDeleted:false})
                            .where("userId=:userId",{userId:token['id']})
                            .execute();
                }else{
                    await this.commentRecommendRepository.createQueryBuilder()
                            .update('commentRecommend')
                            .set({isDeleted:true})
                            .where("userId=:userId",{userId:token['id']})
                            .execute();
                }
                return {success:true};
            }
            
        }catch(err){
            this.logger.error(err);
            return {success :false , msg : '댓글 추천 중 에러발생'}
        }
    }

    /**추천이 있는지 없는지 확인 */
    async checkRecommend(userId, recommendId){
        try{
            const res = await this.commentRecommendRepository.createQueryBuilder()
                        .where("userId=:userId",{userId:userId})
                        .andWhere("commentId=:commentId",{commentId:recommendId})
                        .getOne();

            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    /**사우이 추천 댓글 조회 */
    async commentLimit(boardId:number){
        try{
            const res = await this.coRepository.query(
                "select * "+
                "from alcohol.comment c "+
                "left join "+
                "(select id,count(*) as count,commentId "+
                "from alcohol.commentRecommend) r "+
                "on c.id = r.commentId "+
                "where boardId = "+boardId+" "+
                "and c.isDeleted=false "+
                "order by count desc "+
                "limit 2;"
            )
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false,msg:"상위 추천 댓글 조회 실패"};
        }
    }

    async myComment(header):Promise<CommentEntity|object>{
        try{
            const token = this.jwtService.decode(header);

            const id = token['id'];

            const res = await this.coRepository.createQueryBuilder('comment')
                        .where("userId=:id",{id:id})
                        .getMany();

            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:'내가 쓴 겟글 댓글 조회 실패'};
        }
    }


}
