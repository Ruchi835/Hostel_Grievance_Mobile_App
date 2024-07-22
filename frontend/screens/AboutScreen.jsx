import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Animated } from 'react-native';

const AboutScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.header, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Text style={styles.title}>About Our App</Text>
      </Animated.View>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Image style={styles.image} source={require('../assets/images/about.png')} />
        <Text style={styles.text}>
          Welcome to our app! Our mission is to provide the best service to our users. This app allows you to manage and track your activities seamlessly. We hope you enjoy using it as much as we enjoyed creating it.
        </Text>
        <Text style={styles.subtitle}>Creators</Text>
        <Text style={styles.text}>
        Our app was developed by a talented team of students dedicated to providing a great user experience. Meet the creators:
        </Text>
        <View style={styles.creators}>
          <Text style={styles.creator}>Sujan PS</Text>
          <Text style={styles.creator}>Ruchitha MA</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#20315f',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color:'#6f7c9a',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20315f',
    marginBottom: 10,
  },
  creators: {
    alignItems: 'center',
  },
  creator: {
    fontSize: 16,
    color:'#20315f',
    marginBottom: 5,
  },
});

export default AboutScreen;
