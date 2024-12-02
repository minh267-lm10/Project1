import axiosclient from "./Axioclient";
const Apiplaylist={
    
   apigetallalbum(currentPage,itemsPerPage){
          const url=`/music/playlists?page=${currentPage}&size=${itemsPerPage}`
        //  const url=`/music/playlists?page=&size=`

    //    cón url=currentPage
        return axiosclient.get(url);
        
    },
    apigetallsonginplaylist(id)
    {

        const url=`/music/playlists/GetAllSongsInPlaylist/${id}`
        return axiosclient.get(url);
    },
    apigetallplaylistuser(currentPage,itemsPerPage)
    {
        const url=`/music/playlists/getMyPlaylist?page=1&size=10`
       
        return axiosclient.get(url)
    },
    apicreateplaylist(data)
    {
      const url="/music/playlists/createPlaylist"
      return axiosclient.post(url,data )
    }
    
}
export default Apiplaylist