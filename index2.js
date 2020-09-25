const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = passTimes => {
  for (const times of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(times.risetime);
    const duration = times.duration;

    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });