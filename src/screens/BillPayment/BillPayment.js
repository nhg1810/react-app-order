import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, getRecipesByIngredientName } from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";

export default function BillPayment(props) {
  // list of table
  const URLApi = "http://192.168.1.10:3000/get-all-table";
  const [table, setTable] = useState([]);

  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
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
          })
          .catch(function (err) {
            console.log(err)
          })
      })

    },
      [props])
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

          />
          <Pressable>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]);

  useEffect(() => { }, [value]);

  // const handleSearch = (text) => {
  //   setValue(text);
  //   var recipeArray1 = getRecipesByRecipeName(text);
  //   var recipeArray2 = getRecipesByCategoryName(text);
  //   var recipeArray3 = getRecipesByIngredientName(text);
  //   var aux = recipeArray1.concat(recipeArray2);
  //   var recipeArray = [...new Set(aux)];

  //   if (text == "") {
  //     setData([]);
  //   } else {
  //     setData(recipeArray);
  //   }
  // };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderTable = ({ item }) => {
    let total = 0;
    return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.categoriesItemContainer}>
        <Text style={styles.categoriesName}>Tên bàn: {item.name}</Text>
        <Text style={styles.categoriesInfo}>Nv phục vụ: {item.account.name}</Text>
        <Text style={styles.categoriesInfo}>{item.product.length} sản phẩm</Text>
        <View style={styles.containDetailOrder}>


          {item.product.map((product) => {
            total += parseFloat(product.prod.price) * parseFloat(product.count);
            return (<>


              <Text style={styles.nameItemProduct}> <Image style={styles.photo} source={{ uri: product.prod.image[0].urlLinkImage }} /> {product.prod.nameProduct} ({product.prod.price}) * {product.count} sp = {product.prod.price * product.count} đ</Text>



            </>)
          })

          }
          <Text style={styles.totalBill}>TỔNG BILL: {total} vnđ</Text> 
          <Text> - Ngày thanh toán: {item.updatedAt}</Text>
        </View>
      </View>
    </TouchableHighlight>)

  };

  return (
    <View style={styles.containBillPayment}>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={table} renderItem={renderTable} keyExtractor={(item) => `${item._id}`} />
    </View>
  );
}
