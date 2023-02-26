/**해당 요청자 아이디와 글의 요청자가 일치하는지 */
export const checkAuth = (tokenId:number, writerId:number) => {
    if(tokenId === writerId){
        return {success: true};
    }else{
        return {success:false};
    }
}

