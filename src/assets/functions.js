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

export {fractionToMinSec};