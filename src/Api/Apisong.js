import axiosclient from "./Axioclient";
const Apisong={
    
   apigetallsong(currentPage,itemsPerPage){
         const url=`/music/songs?page=${currentPage}&size=${itemsPerPage}`
    //    cón url=currentPage
        return axiosclient.get(url);
        
    },
    apigetanh(){
        const url=''
        return axiosclient.get(url)
    }
}
export default Apisong