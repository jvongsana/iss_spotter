const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org/?format=json';

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const address = JSON.parse(body);
    const ip = address['ip'];

    callback(error ,ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = 'https://ipvigilante.com/' + ip;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const lat = JSON.parse(body).data.latitude;
    const long = JSON.parse(body).data.longitude;
    const geo = {
      latitude: lat,
      longitude: long
    };
    
    callback(null, geo);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const responses = JSON.parse(body).response;
    
    callback(null, responses);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, cbCoords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(cbCoords, (error, cbTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, cbTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };