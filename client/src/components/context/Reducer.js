 
 
 const Reducer = (state,{type,payload})=>{
    switch(type){
        case "LOGIN_START":
        return {
            user:null,
            loading:true,
            error:false
        };
        case "LOGIN_SUCCESS":
        return {
            user:payload,
            loading:false,
            error:false
        };
        case "LOGIN_FAILURE":
        return {
            user:null,
            loading:false,
            error:true
        };
        case "UPDATE_START":
            return {
                ...state,
                loading:true,
            };
            case "UPDATE_SUCCESS":
            return {
                user:payload,
                loading:false,
                error:false
            };
            case "UPDATE_FAILUR":
            return {
                user:state.user,
                loading:false,
                error:true
            };
        case "LOGOUT":
            return {
                user:null,
                loading:false,
                error:false
            };
        default:
            return state;
    }
 }
export default Reducer;