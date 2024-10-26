import axiosclient from "./Axioclient";
const Apisong={
    
   apigetallsong(){
        const url='/music/songs'
        return axiosclient.get(url);
        
    },
    apigetanh(){
        const url=''
        return axiosclient.get(url)
    }
}
export default Apisong