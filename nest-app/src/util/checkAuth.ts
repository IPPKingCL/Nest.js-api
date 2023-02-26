export const checkAuth = (tokenId:number, writerId:number) => {
    if(tokenId === writerId){
        return {success: true};
    }else{
        return {success:false};
    }
}

