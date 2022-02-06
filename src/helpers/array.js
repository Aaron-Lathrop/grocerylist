export function onFirst(where, callback, array) {
    return array.some(i => {
        if(where(i, array)) {
            callback(i, array);
            return true;
        }
        return false;
    })
}

export default {
    onFirst
}
