import AuthService from '@/services/AuthService';

const DecodeStuff = {
    getTokenRole(){
        let token;
        try {
            token = localStorage.getItem('token')
            token = AuthService.decodeToken(token)
            return token.role
        } catch (error) {
            token = {role: "nothing"}
            return token.role
        }   
   
    }

}

export default DecodeStuff