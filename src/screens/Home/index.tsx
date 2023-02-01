import { useCallback, useState } from "react";
import { View, ActivityIndicator, useWindowDimensions} from "react-native";
import YoutubeIframe from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';

import { styles, VIDEO_HEIGHT, SCREEN_SPACE } from "./styles";

export function Home(){
  const [videoReady, setVideoReady] = useState(false);

  const { width } = useWindowDimensions();
  const VIDEO_WIDTH = width - (SCREEN_SPACE * 2);

  const onFullScreenChange = useCallback((isFullScreen: boolean) =>{
    if (isFullScreen){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }, []);

  return(
    <View style={styles.container}>
      <YoutubeIframe
          videoId="RyQtYGuml5A"
          width={VIDEO_WIDTH}
          height={videoReady ? VIDEO_HEIGHT : 0}
          onReady={() => setVideoReady(true)}
          onFullScreenChange={onFullScreenChange}
      />

    {!videoReady && <ActivityIndicator color="red" />}

    </View>
  )
}