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
    },
    apisearchsong(item){
        // const url=`http://localhost:8888/api/v1/music/songs/seachSong?name=${item}`
        const url=`/music/songs/seachSong?name=${item}`

        
        return axiosclient.get(url)
    }

}
export default Apisong