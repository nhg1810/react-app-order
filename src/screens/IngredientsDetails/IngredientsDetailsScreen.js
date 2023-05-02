import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllIngredients } from "../../data/MockDataAPI";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;
  const [value, onChangeText] = React.useState('1');

  const item = route.params?.item;
  // const ingredientsArray = getAllIngredients(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Xử lí order' + route.params?.item.nameProduct,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  // const onPressIngredient = (item) => {
  //   let name = getIngredientName(item.ingredientId);
  //   let ingredient = item.ingredientId;
  //   navigation.navigate("Ingredient", { ingredient, name });
  // };

  // const renderIngredient = ({ item }) => (
  //   <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item[0])}>
  //     <View style={styles.container}>
  //       <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
  //       <Text style={styles.title}>{item[0].name}</Text>
  //       <Text style={{ color: "grey" }}>{item[1]}</Text>
  //     </View>
  //   </TouchableHighlight>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập số lượng</Text>
      <TextInput

        style={{
          width: 100,
          height: 50,
          backgroundColor: 'white',
          padding: 5
        }}

        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      {/* <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={ingredientsArray} renderItem={renderIngredient} keyExtractor={(item) => `${item.recipeId}`} /> */}
    </View>
  );
}
