import axios from "axios";
const isAuthoirsed = () => {
    // get stringified object from the local client storage
    const object = localStorage.getItem("data");
    // if the data object is null return and do nothing
    if (object == null || object === undefined) {
        return false
    }
    // parse the json object from the string & destructure the object
    const { token } = JSON.parse(object);
    if (token !== null && token !== "" && token !== undefined) {
        // post request to check if the authentication session is still valid
        // if the session exists ==> {auth:true}
        return axios.post("http://192.168.42.210:3333/signIn/verify", { token })
            .then(res => {
                if (res.data.auth) {
                    return true
                }
                return false
            })
            .catch(err => console.log(err))
    } else {
        return false
    }
}

export default isAuthoirsed;