import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import styles from '../../src (copy)/config/styles';
import colors from '../../src (copy)/config/colors';


export default class TimerText extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      timer: props.initialTime,
      time: '',
      type: props.type,
      timer_style: props.timer_style,
    })
  }

  componentDidMount() {
    this.startCount();
  }

  // componentWillUpdate(nextProps, nextState) {
  //   clearInterval(this.interval);
  //   nextState.timer = nextProps.initialTime;
  //   this.startCount();
  // }

  // componentWillReceiveProps = (nextProps, prevState) => {
  //   console.log('nextProps ', nextProps);
  //   console.log('prevState ', prevState);
  //   if (nextProps) {
  //     this.setState({ timer: nextProps.initialTime });
  //   }

  //   // if (prevState.timer && prevState.timer.length) {

  //   // }
  // }

  componentDidUpdate(nextProps, prevState) {
    if (this.state.timer == 0) {
      clearInterval(this.interval);
      this.setState({ timer: this.props.initialTime })
      this.startCount();
      // this.props.onTimerElapsed()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //  this.props.onTimerElapsed()
  }

  startCount = () => {
    // console.log('in timer class ', this.state.timer);
    this.interval = setInterval(() => {
      var delta = (this.state.timer * 1000) - 1;
      var date = (Date.now() / 1000) + (this.state.timer);

      var seconds = parseInt((delta / 1000) % 60);
      var minutes = parseInt((delta / 1000 / 60) % 60);
      var hours = parseInt((delta / (1000 * 60 * 60)) % 7200);
      var days = parseInt(delta / (1000 * 60 * 60 * 24));


      if (hours >= 48) {
        obj = {
          // letter: 'on ' + datec.epochtotimeconvert(date).day,
          dot: ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2)
        }
      } else if (hours == 0) {
        obj = {
          // letter: minutes + "m " + seconds + "s" + ' left',
          dot: ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2)
        }
      } else if (minutes == 0) {
        obj = {
          // letter: seconds + "s" + ' left',
          dot: ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2)
        }
      } else {
        obj = {
          // letter: hours + "h " + minutes + "m " + seconds + "s" + ' left',
          dot: ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2)
        }
      }
      this.setState((prevState) => ({ timer: prevState.timer - 1, time: obj }))

      if (this.state.timer <= 0) {
        clearInterval(this.interval);
        // this.props.timeOutMethod()
      }

    },
      1000
    );
  }

  render() {
    // console.log('timer in component ', this.state.timer);
    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={this.state.timer_style}
        // style={[styles.textbb14, { textAlign: "center", color: colors.colorAccentDark }]}
        >{(`${this.state.time[this.state.type]}` == 'undefined'
          ? '00 : 00'
          // ? <ActivityIndicator size="small" color={colors.colorSecondary} />
          : `${this.state.time[this.state.type]}`)} </Text>
      </View>
    )
  }
}