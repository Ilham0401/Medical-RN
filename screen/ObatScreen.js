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

class ObatScreen extends Component {
  constructor() {
    super();
    this.state = {
      obat: [],
      form_visible: false,
      id_obat: "",
      action: "",
      nama_obat: "",
      stok: "",
      harga: "",
      satuan: [],
      id_satuan: "",
      kategori: [],
      id_kategori: "",
      margin_1: "",
      margin_2: "",
      find: ""
    };
  }

  get_obat = () => {
    axios
      .get(url + "/obat")
      .then(response => {
        this.setState({ obat: response.data.obat });
      })
      .catch(error => {
        alert(error);
      });
  };

  get_satuan = () => {
    axios
      .get(url + "/satuan")
      .then(response => {
        this.setState({
          satuan: response.data.satuan,
          id_satuan: response.data.satuan[0].id_satuan
        });
      })
      .catch(error => {
        alert("satuan: " + error);
      });
  };

  get_kategori = () => {
    axios
      .get(url + "/kategori")
      .then(response => {
        this.setState({
          kategori: response.data.kategori,
          id_kategori: response.data.kategori[0].id_kategori
        });
      })
      .catch(error => {
        alert("kategori: " + error);
      });
  };

  addObat = () => {
    this.setState({
      form_visible: true, //memunculkan form
      action: "insert",
      id_obat: "IDO" + Math.floor(Math.random() * 1000),
      nama_obat: "",
      stok: "",
      harga: "",
      id_satuan: "",
      id_kategori: "",
      margin_1: "",
      margin_2: ""
    });
  };

  editObat = item => {
    this.setState({
      form_visible: true,
      action: "update",
      id_obat: item.id_obat.toString(),
      nama_obat: item.nama_obat,
      stok: item.stok,
      harga: item.harga,
      id_satuan: item.id_satuan,
      id_kategori: item.id_kategori,
      margin_1: item.margin_1,
      margin_2: item.margin_2
    });
  };

  Drop = id => {
    axios
      .delete(url + "/obat/drop/" + id)
      .then(response => {
        alert(response.data.message);
        this.get_obat();
      })
      .catch(error => {
        alert(error);
      });
  };

  Save = () => {
    this.setState({ form_visible: false });
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_obat", this.state.id_obat);
    form.append("nama_obat", this.state.nama_obat);
    form.append("stok", this.state.stok);
    form.append("harga", this.state.harga);
    form.append("id_satuan", this.state.id_satuan);
    form.append("id_kategori", this.state.id_kategori);
    form.append("margin_1", this.state.margin_1);
    form.append("margin_2", this.state.margin_2);

    axios
      .post(url + "/obat/save", form)
      .then(response => {
        alert(response.data.message);
        this.get_obat();
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.subs = this.props.navigation.addListener("didFocus", () => {
      this.get_obat();
      this.get_satuan();
      this.get_kategori();
    });
  }

  componentWillUnmount() {
    this.subs.remove();
  }

  search = () => {
    let form = new FormData();
    form.append("find", this.state.find);
    axios
      .post(url + "/obat", form)
      .then(response => {
        this.setState({ obat: response.data.obat });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <TopHeader navigation={this.props.navigation} title="Data Obat" />
        <Card containerStyle={{ margin: 2, height: "90%" }} title="Daftar Obat">
          <ScrollView style={{ padding: 10, height: "80%" }}>
            <Input
              type="text"
              name="find"
              value={this.state.find}
              onChangeText={value => this.setState({ find: value })}
              placeholder="Cari bang..."
            />
            <Button title="Carii" onPress={() => this.search()} />
            {this.state.obat.map((item, index) => (
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
                    {item.nama_obat}
                  </Text>
                }
                subtitle={
                  <View>
                    <Text>
                      Dengan Harga Rp.
                      {Number(item.harga) +
                        Number(item.harga) *
                          (Number(item.margin_1) + Number(item.margin_2))}{" "}
                      dengan kategori obat {item.nama_kategori}, dan dengan
                      satuan {item.nama_satuan}. Saat ini terdapat {item.stok}{" "}
                      buah.
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Button
                        containerStyle={{ margin: 5 }}
                        title="Edit"
                        onPress={() => this.editObat(item)}
                      />
                      <Button
                        containerStyle={{ margin: 5, height: 7 }}
                        buttonStyle={{ backgroundColor: "red" }}
                        title="Hapus"
                        onPress={() => this.Drop(item.id_obat)}
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
            title="Tambah Obat"
            onPress={this.addObat}
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
              label="NAMA OBAT"
              value={this.state.nama_obat}
              onChangeText={value => this.setState({ nama_obat: value })}
            />
            <Input
              containerStyle={{ margin: 2 }}
              label="STOK"
              value={this.state.stok}
              onChangeText={value => this.setState({ stok: value })}
              keyboardType="numeric"
            />
            <Input
              containerStyle={{ margin: 2 }}
              label="HARGA"
              value={this.state.harga}
              onChangeText={value => this.setState({ harga: value })}
              keyboardType="numeric"
            />
            <Input
              containerStyle={{ margin: 2 }}
              label="Margin 1"
              value={this.state.margin_1}
              onChangeText={value => this.setState({ margin_1: value })}
              keyboardType="numeric"
            />
            <Input
              containerStyle={{ margin: 2 }}
              label="Margin 2"
              value={this.state.margin_2}
              onChangeText={value => this.setState({ margin_2: value })}
              keyboardType="numeric"
            />
            <Text h5>Pilih Satuan</Text>
            <Picker
              selectedValue={this.state.id_satuan}
              style={{ width: "100%", height: 80 }}
              onValueChange={value => this.setState({ id_satuan: value })}
            >
              {this.state.satuan.map((item, index) => (
                <Picker.Item
                  key={"satuan" + index}
                  label={item.nama_satuan}
                  value={item.id_satuan}
                />
              ))}
            </Picker>
            <Text h5>Pilih Kategori</Text>
            <Picker
              selectedValue={this.state.id_kategori}
              style={{ width: "100%", height: 80 }}
              onValueChange={value => this.setState({ id_kategori: value })}
            >
              {this.state.kategori.map((item, index) => (
                <Picker.Item
                  key={"kategori" + index}
                  label={item.nama_kategori}
                  value={item.id_kategori}
                />
              ))}
            </Picker>
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
export default ObatScreen;
