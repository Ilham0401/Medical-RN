import React, { Component } from "react";
import { View, Text } from "react-native";
import TopHeader from "../component/TopHeader";
// Loads Topheader component that has been made before

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <TopHeader navigation={this.props.navigation} title="Home" />
        <Text>This is your homepage</Text>
      </View>
    );
  }
}
