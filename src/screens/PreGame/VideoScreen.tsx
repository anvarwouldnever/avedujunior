import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Pressable, Text, Platform } from 'react-native';
import { useScale } from '../../hooks/useScale';

export default function VideoScreen({ url }) {

  const videoSource = `${url}`

  const { s, vs } = useScale()

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const togglePlay = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={[{width: '100%', height: Platform.isPad? s(180) : s(170)}, styles.videoWrapper]}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      {!isPlaying && <Pressable onPress={togglePlay} style={styles.playButton}>
        <Text style={styles.playButtonText}>
          ▶
        </Text>
      </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  videoWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'pink',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
