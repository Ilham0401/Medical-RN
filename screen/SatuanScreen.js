import React, { Component } from "react";
import { View, ScrollView, Picker } from "react-native";
import {
  ListItem,
  Button,
  Input,
  Overlay,
  Text,
  Card,
  Badge
} from "react-native-elements";
import axios from "axios";
import TopHeader from "../component/TopHeader";

const url = "http://192.168.43.19/second-api/public";

class SatuanScreen extends Component {
  constructor() {
    super(); //memanggil property agar bisa diakses oleh contructor
    this.state = {
      //membuat state baru
      satuan: [],
      form_visible: false,
      id_satuan: "",
      nama_satuan: "",
      action: "",
      find: ""
    };
  }

  AddSatuan = () => {
    this.setState({
      action: "insert",
      form_visible: true,
      id_satuan: "IDK" + Math.floor(Math.random() * 1000),
      nama_satuan: ""
    });
  };

  EditSatuan = item => {
    this.setState({
      form_visible: true,
      action: "update",
      id_satuan: item.id_satuan.toString(),
      nama_satuan: item.nama_satuan
    });
  };

  get_satuan = () => {
    axios
      .get(url + "/satuan")
      .then(response => {
        this.setState({ satuan: response.data.satuan });
      })
      .catch(error => {
        alert(error);
      });
  };

  Drop = id => {
    axios
      .delete(url + "/satuan/drop/" + id)
      .then(response => {
        alert(response.data.message);
        this.get_satuan();
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount = () => {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.get_satuan();
    });
  };

  componentWillUnmount = () => {
    this.subs.remove();
  };

  Save = () => {
    this.setState({ form_visible: false });
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_satuan", this.state.id_satuan);
    form.append("nama_satuan", this.state.nama_satuan);
    axios
      .post(url + "/satuan/save", form)
      .then(response => {
        alert(response.data.message);
        this.get_satuan();
      })
      .catch(error => {
        alert(error);
      });
  };
  search = event => {
    let form = new FormData();
    form.append("find", this.state.find);
    axios
      .post(url + "/satuan", form)
      .then(response => {
        this.setState({ satuan: response.data.satuan });
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <View>
        <TopHeader navigation={this.props.navigation} title="Satuan" />
        <Card containerStyle={{ margin: 2, height: "90%" }} title="List Satuan">
          <ScrollView style={{ padding: 10, height: "80%" }}>
            <Input
              type="text"
              name="find"
              value={this.state.find}
              onChangeText={value => this.setState({ find: value })}
              placeholder="Cari..."
            />
            <Button title="Carii..." onPress={() => this.search()} />
            {this.state.satuan.map((item, index) => (
              <ListItem
                key={index}
                title={
                  <Text
                    style={{
                      color: "green",
                      fontSize: 20,
                      fontWeight: "bold"
                    }}
                  >
                    {item.nama_satuan}
                  </Text>
                }
                subtitle={
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        containerStyle={{ margin: 5 }}
                        title="Edit"
                        onPress={() => this.EditSatuan(item)}
                      />
                      <Button
                        containerStyle={{ margin: 5, height: 7 }}
                        buttonStyle={{ backgroundColor: "red" }}
                        title="Hapus"
                        onPress={() => this.Drop(item.id_satuan)}
                      />
                    </View>
                  </View>
                }
                bottomDivider
              />
            ))}
          </ScrollView>
          <Button
            buttonStyle={{ backgroundColor: "green" }}
            title="Tambah Satuan"
            onPress={this.AddSatuan}
            type="solid"
            containerStyle={{ marginBottom: 20 }}
          />
        </Card>
        <Overlay
          isVisible={this.state.form_visible}
          onBackdropPress={() => this.setState({ form_visible: false })}
        >
          <ScrollView>
            <Input
              containerStyle={{ margin: 2 }}
              label="NAMA SATUAN"
              value={this.state.nama_satuan}
              onChangeText={value => this.setState({ nama_satuan: value })}
            />
            <Button
              title="Simpan"
              type="solid"
              onPress={this.Save}
              buttonStyle={{ backgroundColor: "green" }}
            />
          </ScrollView>
        </Overlay>
      </View>
    );
  }
}

export default SatuanScreen;
