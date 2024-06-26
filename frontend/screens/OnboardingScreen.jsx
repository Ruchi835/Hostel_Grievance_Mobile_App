import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const OnboardingScreen = ({ navigation }) => {
  const titleOffset = useSharedValue(-50);
  const textOpacity = useSharedValue(0); // start opacity from 0

  useEffect(() => {
    titleOffset.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    textOpacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleOffset.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateX: textOpacity.value * 200-200 }], // translate from left to right
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
        <Text style={styles.title}>Hostel Grievance</Text>
      </Animated.View>

      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.description}>
        Welcome to the Hostel Grievance App.{"\n"} 
        Make Your stay Eazier !!
        </Text>
      </Animated.View>
      <View style={styles.spacer} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Let's Begin</Text>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#F5B041" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
   // fontFamily: 'Inter-Bold',
    marginTop:50, 
    fontWeight: 'bold',
    fontSize: 30,
    color: '#20315f',
  },
  textContainer: {
    marginTop: 200,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent:'center'
  },
  description: {
    //fontFamily: 'Roboto-Regular',
    fontSize:  19,
    fontWeight:'500',
    color: '#20315f',
    textAlign: 'center',
    lineHeight:20,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#20315f',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#F5B041',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
   // fontFamily: 'Roboto-MediumItalic',
  },
});

export default OnboardingScreen;
