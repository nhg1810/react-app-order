import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Button } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";

export default function ActiveTableScreen(props) {
  // list of table
  const URLApi = "http://192.168.1.10:3000/get-all-table";
  const [table, setTable] = useState([]);
  const { navigation, route } = props;

  useEffect(() => {
    console.log('re render')
    if (route.params?.message == 'render') {
      console.log('all table render')

    }
  }, [route])

  // call api account
  getApi()
  function getApi() {
    useEffect(() => {
      setTimeout(() => {
        fetch(URLApi)

          .then(function (res) {
            return res.json();
          }).then(function (rs) {
            if (!rs) {
              alert("error api, cant fetch !!!, Click again !")
            } else {
              let arr_tbl = []
              rs.map((tbl) => {
                if (!tbl.status) {
                  arr_tbl.push(tbl)
                }
              })
              setTable(arr_tbl);
              console.log(arr_tbl);
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      })

    },
      [route])
      ;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);


  const onPressAddCart = () => {
    navigation.navigate("AddOrder");
  }

  const detailPayment = (item, length) => {
    navigation.navigate("DetailPayment", { item, length });
  }
  const renderTable = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => detailPayment(item, item.product.length)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.product[0].prod.image[0].urlLinkImage }} />
        <Text style={styles.categoriesName}>Tên bàn: {item.name}</Text>
        <Text style={styles.categoriesInfo}>Nv phục vụ: {item.account.name}</Text>
        <Text style={styles.categoriesInfo}>{item.product.length} sản phẩm</Text>


      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.areaContainTable}>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={table} renderItem={renderTable} keyExtractor={(item) => `${item._id}`} />
      <Button
        title="Thêm order"
        onPress={() => onPressAddCart()}
      />
    </View>
  );
}
