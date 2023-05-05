import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Các bàn hoạt động"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("ActiveTable");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Thông tin sản phẩm"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />

        <MenuButton
          title="Đơn đã thanh toán"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("BillPayment");
            navigation.closeDrawer();
          }}
        />

        <MenuButton
          title="Nhân viên"
          source={require("../../../assets/icons/info.png")}
          onPress={() => {
            navigation.navigate("Account");
            navigation.closeDrawer();
          }}
        />
         <MenuButton
          title="Lịch sử"
          source={require("../../../assets/icons/list.png")}
          onPress={() => {
            navigation.navigate("History");
            navigation.closeDrawer();
          }}
        />

      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
