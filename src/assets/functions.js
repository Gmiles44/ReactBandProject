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

function animationTest() {
    const element = document.getElementById("repertoire");
    element.style.transform = "scale(1.5)"; /* Increase size by 50% */
    setTimeout(() => {
      element.style.transform = "scale(1)"; /* Return to original size after 1s */
    }, 1000);
  }

export {fractionToMinSec, animationTest};