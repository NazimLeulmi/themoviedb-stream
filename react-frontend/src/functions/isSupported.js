import Browser from "./detectBrowser";


// css line-clamp is not supported on firefox < 68 !

export default () => {
    if (Browser.startsWith("Firefox")) {
        const version = parseInt(Browser.match(/\d+/)[0]);
        if (version >= 68) {
            return true
        } else {
            return false;
        }
    }
    return true
}