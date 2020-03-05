import React, { Component } from "react";
import { Header, Icon } from "react-native-elements";
// Loads header element and Icon from react-native-element library

class TopHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Header
        placement="left"
        backgroundColor="#655c56"
        leftComponent={
          <Icon
            name="menu"
            color="#fff"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: "#fff", fontWeight: "500" }
        }}
        rightComponent={
          <Icon
            name="home"
            color="#fff"
            onPress={() => navigate("Home", { name: "HomeScreen" })}
          />
        }
        statusBarProps={{ barStyle: "light-content" }}
      />
    );
  }
}

export default TopHeader;
