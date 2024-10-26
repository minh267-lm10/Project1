import axiosclient from "./Axioclient";
const Apiuser={
    apiLogin(data){
        const url='/identity/auth/token'
        return axiosclient.post(url,data);
    },
   getspmg(){
        const url='/music/songs'
        return axiosclient.get(url);
        
    }
}
export default Apiuser