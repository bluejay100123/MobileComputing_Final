import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const Page3 = () => {
  return (
    <View style={{ height:"100%" , width:"100%", paddingTop: 30 }}>
      <WebView 
        source={{ uri: 'http://www.nrc.go.kr/portal/html/content.do?depth=ph&menu_cd=03_05' }}
      />
    </View>
  );
};

export default Page3;
