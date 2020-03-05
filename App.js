import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
// Loads dependencies
import HomeScreen from "./screen/HomeScreen";
import KategoriScreen from "./screen/KategoriScreen";
import ObatScreen from "./screen/ObatScreen";
import SatuanScreen from "./screen/SatuanScreen";

// Nav configurations
const AppNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Kategori: {
    screen: KategoriScreen
  },
  Obat: {
    screen: ObatScreen
  },
  Satuan: {
    screen: SatuanScreen
  }
});

export default createAppContainer(AppNavigator);
