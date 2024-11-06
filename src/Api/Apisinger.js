import axiosclient from "./Axioclient";
const Apisinger={
    apisearchsinger(item){
        const url=`/profile/users/seachStageName?stageName=${item}&page=1&size=10`
        return axiosclient.get(url)
    },
    apigetsongsinger(item)
    {
        const url=`/music/songs/getSongsByArtistId/${item}`
        return axiosclient.get(url)
    },
    apigetprofilesinger(item)
    {
        const url=`/profile/users/${item}`
        return axiosclient.get(url)
    },
}
export default Apisinger