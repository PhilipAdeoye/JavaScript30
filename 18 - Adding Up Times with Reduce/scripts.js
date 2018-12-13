(function() {

    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;

    // Select all the list items with 
    const videos = document.querySelectorAll(".videos li[data-time]");
    console.log(videos);    

    const videoTimes = [...videos].map(li => li.dataset.time);
    console.log(videoTimes);

    const totalTimeInSeconds = videoTimes.reduce((accumulator, time) => {
        let segments = time.split(":");
        let minutes = parseInt(segments[0], 10);
        let seconds = parseInt(segments[1], 10);
        let totalTime = minutes * SECONDS_IN_MINUTE + seconds;

        return accumulator + totalTime;
    }, 0);

    console.log(totalTimeInSeconds);

    const totalMinutes = Math.floor(totalTimeInSeconds / SECONDS_IN_MINUTE);

    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const minutes = totalMinutes % MINUTES_IN_HOUR;
    const seconds = totalTimeInSeconds % SECONDS_IN_MINUTE;

    console.log(`Total Video Time = ${hours}:${minutes}:${seconds}`);


})();