import React, {useEffect, useState} from 'react';
import HumanPose from 'react-native-human-pose';
import {View, Text} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video'
import doge from './assets/doge.mp4'

const App = () => {
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [hasSit, setHasSit] = useState(false);
  const [hasStand, setHasStand] = useState(false);
  const onPoseDetected = (pose: any) => {
    // leftHip = 11
    // leftAnkle = 15
    console.log('leftHip', pose[0]?.pose?.leftHip?.y);
    console.log('leftAnkle', pose[0]?.pose?.leftAnkle?.y);
    if (
      pose[0]?.pose?.leftHip?.confidence > 0.5 &&
      pose[0]?.pose?.leftAnkle?.confidence > 0.5
    ) {
      if (
        Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) < 400
      ) {
        setHasSit(true);
        setHasStand(false);
      }
      if (hasSit) {
        if (
          Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) >
          400
        ) {
          setHasStand(true);
          setHasSit(false);
        }
      }
    }
  };

  useEffect(() => {
    setNoOfSquats(hasStand ? noOfSquats + 1 : noOfSquats);
  }, [hasStand]);

  return (
    <View style={{flex: 1, backgroundColor:'#EBF5FF'}}>
      <HumanPose
        height={500}
        width={500}
        enableKeyPoints={true}
        enableSkeleton={true}
        flipHorizontal={false}
        isBackCamera={true}
        mode='single'
        color={'255, 0, 0'}
        onPoseDetected={onPoseDetected}
      />
      {/* <VideoPlayer
        video={doge}
        // videoWidth={100}
        // videoHeight={200}
        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
    /> */}
    <Video 
    source={doge}
    style={{
      position:'absolute',
      top:'10%',
      // // bottom:0,
      // left:0,
      // right:0,
      right:'2%',
      width:430,
      height:'100%',
    }}
    repeat={true}
    controls={true}
    />
    </View>
  );
};

export default App;