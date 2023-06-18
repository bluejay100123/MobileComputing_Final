import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CountBg from './countBg';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Splash from './splash';
import Exit from './exit';
import Indicator from './indicator';

const SCREEN_WIDTH = Dimensions.get('window').width;

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(page);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const pages = [
    { component: Page1 },
    { component: Page2 },
    { component: Page3 },
    { component: Page4 },
  ];

  return (
    <View style={styles.container}> 
      {showSplash ? (
        <Splash onComplete={handleSplashComplete} />
      ) : (
        <>
        <CountBg />
          <ScrollView
            horizontal
            pagingEnabled
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
          >
            {pages.map((page, index) => (
              <View key={index} style={styles.page}>
                {index === 0 && (
                  <page.component isSwitchOn={isSwitchOn} />
                )}
                {index === 1 && (
                  <page.component isSwitchOn={isSwitchOn} />
                )}
                {index === 2 && (
                  <page.component />
                )}
                {index === 3 && (
                  <page.component isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
                )}
              </View>
            ))}
          </ScrollView>
          <Indicator pageCount={pages.length} currentPage={currentPage} />
        </>
      )}
      <Exit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
