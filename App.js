import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { WebView } from 'react-native-webview';
import applyCode from './codes'

const toneHtml = require('./assets/tone.html');


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [barcodeData, setBarcodeData] = useState("")
  const [barcodeType, setBarcodeType] = useState("")

  let webRef = null
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{ flex: 1 }}>
       <Camera 
          style={{ flex: 1 }} 
          type={type}
          // autoFocus={Camera.Auto}
          onBarCodeScanned={code => {
            setBarcodeData(code.data)
            setBarcodeType(code.type)
            applyCode(webRef, code.data.toLowerCase())
            
          }}
        >

          <WebView 
            style={{opacity: 0}}
            ref={r => webRef = r}
            source={toneHtml}
            onMessage={event => {
              alert(event.nativeEvent.data);
            }}
          ></WebView>
          

          <View style={{height: 120, width: '100%', position: "absolute", bottom: 0, padding: 20, backgroundColor: 'white'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 5, maxHeight: 75}}>{barcodeData}</Text>
            <Text style={{opacity: 0.5}}>{barcodeType}</Text>
          </View>

        </Camera>
    </View>
  );
}
