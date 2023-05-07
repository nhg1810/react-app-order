import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable, ActivityIndicator } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, getRecipesByIngredientName } from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";

export default function BillPayment(props) {
  // list of table
  const URLApi = "https://40a6-113-176-178-251.ngrok-free.app/get-all-table";
  const [table, setTable] = useState([]);

  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  // call api all table payment
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
                if (tbl.status) {
                  arr_tbl.push(tbl)
                }
              })
              setTable(arr_tbl);
            }
          }).then(() => {
            if (value == "") {
              setData(table);

            }
          })
          .catch(function (err) {
            console.log(err)
          })
      })

    },
      [props, table])
      ;
  }
  useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bằng tên bàn"
            onChangeText={liveSearch}
            value={value}

          />
          <Pressable onPress={() => {
            clearValueSearch()
          }}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]);
  const clearValueSearch = () => {
    setValue("")
  }
  //function post api
  const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  useEffect(() => {
    if (data.length != 0) {
      setLoader(false)
    }
  }, [data])

  const liveSearch = async (text) => {
    setValue(text)
    if (text == "") {
      setData(table)
      console.log('show all')
    } else {
      let obj = {
        vlSearch: text
      }
      let rs = await postData('https://40a6-113-176-178-251.ngrok-free.app/live-search-order', obj);
      if (rs.lengh != 0) {
        setData(rs)
      }

      console.log(rs)
    }
  }
  const renderTable = ({ item }) => {
    let total = 0;
    return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.categoriesItemContainer}>
        <Text style={styles.categoriesName}>Tên bàn: {item.name}</Text>
        <Text style={styles.categoriesInfo}>Nv phục vụ: {item.account.name}</Text>
        <Text style={styles.categoriesInfo}>{item.product.length} sản phẩm</Text>
        <View style={styles.containDetailOrder}>


          {item.product.map((product, index) => {
            total += parseFloat(product.prod.price) * parseFloat(product.count);
            return (


              <Text key={product.prod._id} style={styles.nameItemProduct}> <Image style={styles.photo} source={{ uri: product.prod.image[0].urlLinkImage }} /> {product.prod.nameProduct} ({product.prod.price}) * {product.count} sp = {product.prod.price * product.count} đ</Text>

            )
          })

          }
          <Text style={styles.totalBill}>TỔNG BILL: {total} vnđ</Text>
          <Text> - Ngày thanh toán: {item.updatedAt}</Text>
        </View>
      </View>
    </TouchableHighlight>)

  };

  return (
    loader ?
      <View style={styles.viewLoader}>
        <ActivityIndicator size="large" />
        <Text>Đang tải...</Text>
      </View> :
      <View style={styles.containBillPayment}>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={data} renderItem={renderTable} keyExtractor={(item) => `${item._id}`} />
      </View>
  );
}
