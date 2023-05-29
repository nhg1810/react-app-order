import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, ActivityIndicator } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const [product, setProduct] = useState([])
  const [loader, setLoader] = useState(true);
  var URLApi = "http://192.168.1.26:3000/get-all-prod";
  //fetch data get all prod
  // call api
  useEffect(() => {
    setTimeout(() => {
      fetch(URLApi)
        .then(function (res) {
          return res.json();
        }).then(function (rs) {
          if (!rs) {
            alert("error api, cant fetch !!!, Click again !")
          } else {
            setProduct(rs)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    })

  },
    [])
    ;
  useEffect(() => {
    if (product.length != 0) {
      setTimeout(function () {
        setLoader(false);
      }, 1000)
    }
  }, [product])

  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
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



  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => {
    if (item) {
      console.log(item.image[0].urlLinkImage.trim());
      return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.image[0].urlLinkImage.trim() }} />
          <Text style={styles.title}>{item.nameProduct}</Text>
          <Text style={styles.category}>{item.category.name}</Text>
        </View>
      </TouchableHighlight>)
    }


  };

  return (
    loader ? <View style={styles.viewLoader}>
      <ActivityIndicator size="large" />
      <Text>Đang tải...</Text>
    </View>
      :
      <View style={styles.containProduct}>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={product} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} />
      </View>
  );
}
