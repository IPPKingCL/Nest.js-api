import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FavoriteRepository } from 'src/user/repository/favorite.repository';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { CocktailRepository } from './repository/Cocktail.repository';
import { CocktailCommentRepository } from './repository/CocktailComment.repository';
import { JuiceRepository } from './repository/Juice.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';
import { RatingRepository } from './repository/Rating.repository';
import { UserRepository } from './repository/User.repository';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';


@Injectable()
export class ContentFilteringService{
    private readonly logger = new Logger(ContentFilteringService.name);
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
    /**콘텐츠 기반 필터링 추천 */
    async CFR(header): Promise<object> {

        try {
            const token = this.jwtService.decode(header);

            const user = await this.userInfo(token['id']); //유저 테이블 정보
            const favorite = await this.userFavorite(token['id']); //유저 선호 테이블 정보

            console.log(user);
            //가져온 정보 변수에 담기
            const price = parseInt(user[0].price);
            console.log(price)
            const age = user[0]['age'];

            const able = await this.ablePrice(age);

            let lastPrice: number = 0; //디비 조회 할 때 기준 금액

            console.log(able);
            console.log('프라이스 :' + price);
            if (able > price) {
                lastPrice = (price + able) / 2
            } else {
                lastPrice = price;
            }

            if (favorite.length > 0) { //favorite list 가 있을 시
                const list = await this.cocktailList(favorite, lastPrice);
                const arr = await this.makeArray(list);

                const res = await this.returnArray(arr);

                return res;
            } else { //favorite list 가 없을 시
                const list = await this.randomList(lastPrice);
                const res = await this.returnArray(list);

                return res;
            }


        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "칵테일 추천 실패" };
        }

    }

    /**칵테일 추천을 위한 해당 유저의 정보 조회 */
    async userInfo(id: number) {
        try {
            const res = await this.userRepository.query(
                'select * from user where id=' + id
            );
            return res;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "유저 정보 조회 실패" };
        }
    }

    /**유저가 좋아한다고 한 favorite list 조회 */
    async userFavorite(id: number) {
        try {
            const res = await this.favoriteRepository.query(
                'select alchoId from favorite where userId=' + id
            )
            return res;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "유저 좋아하는 리스트 조회 실패" };
        }
    }

    /**가능 금액 산정 */
    async ablePrice(age: number) {  
        console.log('age : ' + age)
        if (20 <= age && age < 23) {
            return 30000;
        } else if (23 <= age && age < 28) {
            return 50000;
        } else if (28 <= age && age < 32) {
            return 100000;
        } else if (32 <= age) {
            return 150000;
        } else {
            return 200000;
        }
    }

    /**추천 칵테일 리스트 조회 */
    async cocktailList(favorite, lastPrice) {
        try {
            let array = new Array<object>();
            for (let i = 0; i < favorite.length; i++) {
                const res = await this.cockRepository.query(
                    'select * ' +
                    'from cocktail c ' +
                    'inner join ' +
                    '(select cocktailId, price ' +
                    'from alchoRecipe r, Alcho a ' +
                    'where a.alchoCategoryId=' + favorite[i].alchoId + ' and r.alchoId=a.id and price<' + lastPrice + ') k ' +
                    'on c.id=k.cocktailId; '

                )
                array.push(res);
            }
            return array;

        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "칵테일 리스트 조회 실패" }
        }
    }

    async makeArray(list) {  //배열로 만들기
        const arr = new Array();
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                arr.push(list[i][j]);
            }
        }

        return arr;
    }

    /*favorite 없을 때 리스트 뽑아내기*/
    async randomList(lastPrice: number) {  
        try {
            const res = await this.cockRepository.query(
                'select * ' +
                'from cocktail c ' +
                'inner join ' +
                '(select cocktailId, price ' +
                'from alchoRecipe r, Alcho a ' +
                'where r.alchoId=a.id and price<' + lastPrice + ' and sugar*r.amount>80) k ' +
                'on c.id=k.cocktailId; '
            )

            return res;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "칵테일 랜덤리스트 조회 실패" }
        }
    }

    /**리스트에서 랜덤으로 3개 추천 */
    async returnArray(arr) {
        const res = new Array();
        let i = 0;
        
        while (i < 3) {
            const randomValue = await arr[Math.floor(Math.random() * arr.length)];
            console.log(randomValue);

            if(res.indexOf(randomValue) === -1){
                res.push(randomValue);
                i++;
            }
            
        }

        return res;
    }

}