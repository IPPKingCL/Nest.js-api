export function getToken(header){
    console.log(header)
    const autho =  header.authorization;
    const head = autho.split(' ');
    
    return head[1];
}