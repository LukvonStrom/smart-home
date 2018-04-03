const spotifyWeb = require('./spotify'),
    log = require("fancy-log"),
    events = require('events');


const s = new spotifyWeb.SpotifyWebHelper();

const socket = require('socket.io-client')('http://192.168.178.74');

socket.on('connect', () => {
    console.log('connected');
    global.intloop = setInterval(checkSpotify, 1500);
});

let songEmitter = new events.EventEmitter(),
    currentSong = {};

async function spotifyReconnect() {
    s.getStatus(function (err, res) {
        if (!err) {
            clearInterval(check);
            global.intloop = setInterval(checkSpotify, 1500);
        }
    });
}

async function checkSpotify() {
    s.getStatus(function (err, res) {
        if (err) {
            if (err.code === "ECONNREFUSED") {
                if (err.address === "127.0.0.1" && err.port === 4381) {
                    /**
                     * Temporary workaround - to truly fix this, we need to change spotify.js to check for ports above 4381 to the maximum range.
                     * This is usually caused by closing Spotify and reopening before the port stops listening. Waiting about 10 seconds should be
                     * sufficient time to reopen the application.
                     **/
                    log.error("Spotify seems to be closed or unreachable on port 4381! Close Spotify and wait 10 seconds before restarting for this to work. Checking every 5 seconds to check if you've done so.");
                    clearInterval(intloop);
                    global.check = setInterval(spotifyReconnect, 5000);
                }
            } else {
                if (err.code === "ENOTFOUND" || err.code === "ENOENT" || err.code === "ECONNRESET") {
                    log.error("Maybe in Hibernation... waiting ....");
                    return;
                }
                log.error("Failed to fetch Spotify data:", err);
            }
            return;
        }

        if (res.track == null) return;

        if (!res.track.track_resource || !res.track.artist_resource) return;

        if (currentSong.uri && res.track.track_resource.uri === currentSong.uri && (res.playing !== currentSong.playing)) {
            currentSong.playing = res.playing;
            currentSong.position = res.playing_position;
            songEmitter.emit('songUpdate', currentSong);
            return;
        }

        if (res.track.track_resource.uri === currentSong.uri) return;

        let start = parseInt(new Date().getTime().toString().substr(0, 10)),
            end = start + (res.track.length - res.playing_position);

        let song = {
            uri: (res.track.track_resource.uri ? res.track.track_resource.uri : ""),
            name: res.track.track_resource.name,
            album: (res.track.album_resource ? res.track.album_resource.name : ""),
            artist: (res.track.artist_resource ? res.track.artist_resource.name : ""),
            playing: res.playing,
            position: res.playing_position,
            length: res.track.length,
            start,
            end
        };

        currentSong = song;

        songEmitter.emit('newSong', song);
    });
}

/**
 * Initialise song listeners
 * newSong: gets emitted when the song changes to update the RP
 * songUpdate: currently gets executed when the song gets paused/resumes playing.
 **/
songEmitter.on('newSong', song => {

    updateState(song);
    log(`Updated song to: ${song.artist} - ${song.name}`);

});

songEmitter.on('songUpdate', song => {
    let startTimestamp = song.playing ?
        parseInt(new Date().getTime().toString().substr(0, 10)) - song.position :
        undefined,
        endTimestamp = song.playing ?
            startTimestamp + song.length :
            undefined;
    updateState(song);

    log(`Song state updated (playing: ${song.playing})`)
});

function updateState(song) {
    let obj = {
        name: song.name,
        artist: song.artist,
        playing: song.playing,
    };

    socket.emit('songUpdate', obj);
}
