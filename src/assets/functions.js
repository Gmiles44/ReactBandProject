function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function fractionToMinSec(timeInFraction) {
    const msLength = timeInFraction * 60000
    const mins = parseInt(timeInFraction)
    const rawSecs = Math.round((msLength - (mins * 60000)) / 1000)
    const secs = pad(rawSecs, 2);
    return (mins + ":" + secs)
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export {fractionToMinSec, array_move};