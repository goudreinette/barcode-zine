import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import SvgUri from "expo-svg-uri";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [barcodeData, setBarcodeData] = useState("")
  const [barcodeType, setBarcodeType] = useState("")
  
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
          autoFocus={Camera.Constants.AutoFocus}
          onBarCodeScanned={code => {
            setBarcodeData(code.data)
            setBarcodeType(code.type)
          }}
        >
          <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <SvgUri
              width="200"
              height="200"
              svgXmlData={barcodeData}
            />
          </View>
          
          <View style={{height: 120, width: '100%', position: "absolute", bottom: 0, padding: 20, backgroundColor: 'white'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 5, maxHeight: 75}}>{barcodeData}</Text>
            <Text style={{opacity: 0.5}}>{barcodeType}</Text>
          </View>

        </Camera>
    </View>
  );
}
