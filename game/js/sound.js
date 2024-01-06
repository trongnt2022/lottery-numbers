////////////////////////////////////////////////////////////
// SOUND
////////////////////////////////////////////////////////////
var enableMobileSound = true;
var soundOn;

function playSound(target, loop) {
  if (soundOn) {
    var isLoop;
    if (loop) {
      isLoop = -1;
      createjs.Sound.stop();
      musicLoop = createjs.Sound.play(
        target,
        createjs.Sound.INTERRUPT_NONE,
        0,
        0,
        isLoop,
        1
      );
      if (
        musicLoop == null ||
        musicLoop.playState == createjs.Sound.PLAY_FAILED
      ) {
        return;
      } else {
        musicLoop.removeAllEventListeners();
        musicLoop.addEventListener("complete", function (musicLoop) {});
      }
    } else {
      isLoop = 0;
      createjs.Sound.play(target);
    }
  }
}
var currentMusicIndex = 0; // chỉ số của bản nhạc hiện tại đang phát
// tôi muốn play một list nhạc và khi nào hết thì mới play lại từ đầu
function playMusicList() {
    if (soundOn) {
        var sound = listNhac[currentMusicIndex];
        var music = createjs.Sound.play(sound);
        music.removeAllEventListeners();
        music.addEventListener("complete", function () {
            // khi một bản nhạc kết thúc, tăng chỉ số lên 1
            currentMusicIndex++;
            // nếu đã đến cuối danh sách, đặt lại chỉ số về 0
            if (currentMusicIndex >= listNhac.length) {
                currentMusicIndex = 0;
            }
            // phát bản nhạc tiếp theo
            playMusicList(listNhac);
        });
    }
}
// function playMusic background
var isPlaying = false;

function playMusicListBackground() {
    if (isPlaying) return;
    if (soundOn) {
        isPlaying = true;
        playMusicList();
    }
}


function stopSound() {
  createjs.Sound.stop();
}

/*!
 *
 * PLAY MUSIC - This is the function that runs to play and stop music
 *
 */
$.sound = {};
function playSoundLoop(sound) {
  if (soundOn) {
    if ($.sound[sound] == null) {
      console.log("sound", sound);
      $.sound[sound] = createjs.Sound.play(sound);
      $.sound[sound].removeAllEventListeners();
      $.sound[sound].addEventListener("complete", function () {
        $.sound[sound].play();
      });
    }
  }
}

function stopSoundLoop(sound) {
  if (soundOn) {
    if ($.sound[sound] != null) {
      $.sound[sound].stop();
      $.sound[sound] = null;
    }
  }
}

function setSoundVolume(sound, vol) {
  if (soundOn) {
    if ($.sound[sound] != null) {
      $.sound[sound].volume = vol;
    }
  }
}

/*!
 *
 * TOGGLE MUTE - This is the function that runs to toggle mute
 *
 */
function toggleMute(con) {
  createjs.Sound.setMute(con);
}
