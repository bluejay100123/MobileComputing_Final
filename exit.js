import React, { useState, useEffect } from 'react';
import { BackHandler, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Exit = () => {
  const [showExitPrompt, setShowExitPrompt] = useState(false); // State to control the exit prompt visibility

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showExitPrompt) {
        // If exit prompt is already visible, exit the app
        BackHandler.exitApp();
      } else {
        // Show exit prompt when the back button is pressed
        setShowExitPrompt(true);
      }
      return true; // Prevent default back button behavior
    });

    return () => backHandler.remove();
  }, [showExitPrompt]);

  const handleExitPrompt = (shouldExit) => {
    if (shouldExit) {
      BackHandler.exitApp(); // Exit the app if the user selects "Yes"
    } else {
      setShowExitPrompt(false); // Hide the exit prompt if the user selects "No"
    }
  };

  return (
    <Modal visible={showExitPrompt} transparent>
      <View style={styles.overlay}>
        <View style={styles.exitPrompt}>
          <Text style={styles.exitPromptText}>Are you sure you want to exit?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleExitPrompt(true)} // User selects "Yes"
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonNo]}
              onPress={() => handleExitPrompt(false)} // User selects "No"
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent gray overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitPrompt: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  exitPromptText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  buttonNo: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Exit;
