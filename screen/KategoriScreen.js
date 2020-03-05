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

class KategoriScreen extends Component {
  constructor() {
    super();
    this.state = {
      kategori: [],
      form_visible: false,
      id_kategori: "",
      nama_kategori: "",
      action: "",
      find: ""
    };
  }

  AddKategori = () => {
    this.setState({
      action: "insert",
      form_visible: true,
      id_kategori: "IDK" + Math.floor(Math.random() * 1000),
      nama_kategori: ""
    });
  };

  EditKategori = item => {
    this.setState({
      form_visible: true,
      action: "update",
      id_kategori: item.id_kategori.toString(),
      nama_kategori: item.nama_kategori
    });
  };

  get_kategori = () => {
    axios
      .get(url + "/kategori")
      .then(response => {
        this.setState({ kategori: response.data.kategori });
      })
      .catch(error => {
        alert(error);
      });
  };

  Drop = id => {
    axios
      .delete(url + "/kategori/drop/" + id)
      .then(response => {
        alert(response.data.message);
        this.get_kategori();
      })
      .catch(error => {
        alert(error);
      });
  };

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.get_kategori();
    });
  }

  componentWillUnmount() {
    this.subs.remove();
  }

  Save = () => {
    this.setState({ form_visible: false });
    let form = new FormData();
    form.append("action", this.state.action); // membungkus data action
    form.append("id_kategori", this.state.id_kategori); // membungkus data id_siswa
    form.append("nama_kategori", this.state.nama_kategori);
    axios
      .post(url + "/kategori/save", form)
      .then(response => {
        alert(response.data.message);
        this.get_kategori();
      })
      .catch(error => {
        alert(error);
      });
  };
  search = event => {
    let form = new FormData();
    form.append("find", this.state.find);
    axios
      .post(url + "/kategori", form)
      .then(response => {
        this.setState({ kategori: response.data.kategori });
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <View>
        <TopHeader navigation={this.props.navigation} title="Kategori" />
        <Card
          containerStyle={{ margin: 2, height: "90%" }}
          title="List Kategori"
        >
          <ScrollView style={{ padding: 10, height: "80%" }}>
            <Input
              type="text"
              name="find"
              value={this.state.find}
              onChangeText={value => this.setState({ find: value })}
              placeholder="Cari..."
            />
            <Button title="Carii..." onPress={() => this.search()} />
            {this.state.kategori.map((item, index) => (
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
                    {item.nama_kategori}
                  </Text>
                }
                subtitle={
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        containerStyle={{ margin: 5 }}
                        title="Edit"
                        onPress={() => this.EditKategori(item)}
                      />
                      <Button
                        containerStyle={{ margin: 5, height: 7 }}
                        buttonStyle={{ backgroundColor: "red" }}
                        title="Hapus"
                        onPress={() => this.Drop(item.id_kategori)}
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
            title="Tambah Kategori"
            onPress={this.AddKategori}
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
              label="NAMA Kategori"
              value={this.state.nama_kategori}
              onChangeText={value => this.setState({ nama_kategori: value })}
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

export default KategoriScreen;
