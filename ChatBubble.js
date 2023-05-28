import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Svg, { Path, Circle } from 'react-native-svg';

class ChatBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bubbleAnimation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.spring(this.state.bubbleAnimation, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }
  render() {
    // const { message, isUser } = this.props;
    const bubbleStyle = {
      transform: [
        {
          translateX: this.state.bubbleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.bubbleType === 'left' ? 200 : -200, 0],
          }),
        },
      ],
    };
    return (
      <Animated.View style={[styles.container, this.props.bubbleType === 'left' ? styles.userContainer : styles.responseContainer, bubbleStyle]}>
        <Text style={[styles.message, this.props.bubbleType === 'left' ? { color: '#f7fafa' } : { color: '#646666' }]}>{this.props.msg}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '70%',
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  responseContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3e8e8',
    marginLeft: 10
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#211f1f',
    marginRight: 10
  },
  message: {
    fontSize: 16,
    color: '#646666'
  },
});


export default ChatBubble;