import { Injectable, Logger } from "@nestjs/common";
import { alchoRepository } from './repository/alcho.repository';
import { alchoCommentRepository } from './repository/alchoComment.repository';
import { alchoCategoryRepository } from './repository/alchoCategory.repository';
import { JwtService } from '@nestjs/jwt';
import { AlchoCommentEntity } from "src/entities/alchoComment.entity";

@Injectable()
export class AlcoholCommentService{
    private readonly logger = new Logger(AlcoholCommentService.name)
    constructor(
        private readonly alchoRepository : alchoRepository,
        private readonly alchoCommentRepository : alchoCommentRepository,
        private readonly alchoCategoryRepository : alchoCategoryRepository,
        private jwtService: JwtService
    ){}

    
    /*****************술 정보 댓글 *****************/

    async insertComment(commentDto, header) : Promise<object>{
        try{
            const token = this.jwtService.decode(header);

            console.log(token)
            const alchoCommentEntity = new AlchoCommentEntity();
            alchoCommentEntity.content = commentDto.content;
            alchoCommentEntity.dateTime = new Date();
            alchoCommentEntity.isDeleted = false;
            alchoCommentEntity.user = token["id"];
            alchoCommentEntity.alcho= commentDto.alchoId;
            alchoCommentEntity.nickname = token["nickname"];

            await this.alchoCommentRepository.insert(alchoCommentEntity);
            
            return {success:true}

        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "댓글 등록 중 에러 발생"};
        }
    }

    async commentAll(id:number) {
        try{
            return await this.alchoCommentRepository.createQueryBuilder('alchoComment')
                        .leftJoinAndSelect('alchoComment.user','user.id')
                        .where("alchoId=:id",{id:id})
                        .andWhere("isDeleted=false")
                        .getMany();
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "댓글 조회 중 에러 발생"};
        }

    }

    async deleteComment(deleteComment, header:string) : Promise<object>{
        try{
            const token = this.jwtService.decode(header);
            if(deleteComment.userId==(token['id'])){
                await this.alchoCommentRepository.createQueryBuilder()
                    .update("alchoComment")
                    .set({isDeleted:true})
                    .where("id=:id",{id:deleteComment.id})
                    .execute();
                return {success:true}
            }else{
                return {success: false, msg:"no"}
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "댓글 삭제 실패"}
        }
    }
}