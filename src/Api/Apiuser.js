import axiosclient from "./Axioclient";
const Apiuser={
    apiLogin(data){
        const url='/identity/auth/token'
        return axiosclient.post(url,data);
    },
    getProfile(){
        const url="/profile/users/my-profile"
        return axiosclient.get(url)

    },
    apiRegister(data)
    {
        // identity/users/registration/guest
        const url='/identity/users/registration/guest'
        return axiosclient.post(url,data);

    }
}
export default Apiuser