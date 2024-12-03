import { getToken } from "../Service/Localtokenservice";
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
    },
    apifollow(userId)
    {
        const url=`/profile/users/followUserOrUnfollowUser?targetUserId=${userId}`
        return axiosclient.post(url)
    },
    apicreatepost(data)
    {
        
        const url='/post/create'
        return axiosclient.post(url,data)
    },
    apigetuserpost()
    {
        const  url='/post/my-posts'
        return axiosclient.get(url)
    },
    apigetpostfollow()
    {
        const url="/post/myFollowingPosts"
        return axiosclient.get(url);
    },
    apipayment()
    {
        let t= 100000
        const url=`/identity/vnpay/create_payment?amount=100000`
        return axiosclient.get(url)
    },
    apresettoken()
    {
        let t= getToken()
        const url=`identity/auth/refresh`
        return axiosclient.post(url,t)
    }
}
export default Apiuser