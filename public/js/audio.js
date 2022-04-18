	var main_isMobile = false;
	var soundTrack,
		soundIsOn = false,
		soundIsStarted = false,
		soundIsMuted = false,
		soundVolume = 50;
		firestRun = true;




		if (typeof Cookies.get('sound') !== 'undefined') {
		//soundIsOn = Cookies.get('sound');
			//console.log("Cookie:"+Cookies.get('sound'));
			if (Cookies.get('sound')){
				//$('#soundButton').removeClass('off').addClass('on');
			}else{
				//$('#soundButton').removeClass('on').addClass('off');
			}
	}

	function initAudio(callbackFn) {
		if (!deviceSettings.isMobile) {
			if (firestRun){
				soundIsOn = true;
				if (typeof Cookies.get('sound') !== 'undefined') {
					//soundIsOn = Cookies.get('sound');
				}

				soundIsStarted = true;
				TweenMax.set( "#soundButton", { autoAlpha: 1 });

				soundManager.setup({
					url: 'assets/swf/',
					onready: function() {
						if (soundIsOn === true) {
							sound_start();
						}
					},
					ontimeout: function() {
					}
				});

				if (main_isMobile) {
					sound_pause();
					soundIsOn = false;
					$('#soundButton').removeClass('on').addClass('off');
				}

				/*
				// WHEN LEAVE TAB OR PAGE
				window.addEventListener("blur", function(e){
					if(!main_isMobile){
						if (soundIsOn == true && soundIsMuted == false){
							sound_pause();
						}
					}
				}, false);

				// WHEN YOU RETURN TO PAGE
				window.addEventListener("focus",function(e){
					if(!main_isMobile){
						if (soundIsOn == true && soundIsMuted == false){
							sound_resume();
						}
					}
				}, false);
				*/




				$('#soundButton').click(function (e){e.preventDefault();sound_toggle();});
				firestRun  = false;
			}

		}

		if (callbackFn) {
			callbackFn();
		}
	}

	function sound_loop(sound) {
		soundManager.play(sound,{
			onfinish: function() {
				sound_loop(sound);
			}
		});
	}

	function sound_start() {
		 soundTrack = soundManager.createSound({
			id: 'soundTrackMp3',
			url: '/assets/audio/comingsoon.mp3',
			autoPlay: true,
			volume: soundVolume,
			onfinish: function() {
				sound_loop('soundTrackMp3');
			}
		});
	}
	function sound_pause(){
		//soundManager.pause('soundTrackMp3');
        TweenMax.to({ volume: soundVolume }, 1, { volume: 0, onUpdateParams: ['{self}'], onUpdate: function (tween) {
			soundVolume = tween.target.volume;
			soundManager.setVolume(soundVolume);
        }});
	}

	function sound_resume(){
		//soundManager.resume('soundTrackMp3');
        TweenMax.to({ volume: soundVolume }, 1, { volume: 50, onUpdateParams: ['{self}'], onUpdate: function (tween) {
			soundVolume = tween.target.volume;
			soundManager.setVolume(soundVolume);
        }});
	}

	function sound_toggle(){
		if(soundIsOn){

			soundIsOn = false;
			$('#soundButton').removeClass('on').addClass('off');
			sound_pause();
			Cookies.set('sound', false, { expires: 7 });
		}else {

			soundIsOn = true;
			$('#soundButton').removeClass('off').addClass('on');
			sound_resume();
			Cookies.set('sound', true, { expires: 7 });
		}
	}

//$(document).ready(initAudio);
