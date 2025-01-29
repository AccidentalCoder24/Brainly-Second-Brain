export function random(len:number){
    let words = "abcdhsbkadfhuaefhaew45723528bsdhkjb47273" ;
    let length = words.length ;
    let ans = "" ;

    for (let i=0 ; i<len ; i++){
        ans+=words[Math.floor(Math.random()*length)] ;
    }

    return ans ;
}
