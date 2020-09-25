const { nextISSTimesForMyLocation } = require('./iss');

const printTimes = passTimes => {
  console.log(passTimes);
  for (const times of passTimes) {
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(times.risetime);
    const duration = times.duration;

    console.log(`Next pass at ${dateAndTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // success, print out the deets!
  printTimes(passTimes);
});
