const generateRandomId=()=> {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var autoId = ""

    for(let i=0;i<20;i++) {
        autoId += characters[ parseInt(Math.floor(Math.random() * characters.length))]
    }
    return autoId
}
export default generateRandomId;