import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const [detail, setDetail] = useState();

  const { navigation, route } = props;

  const item = route.params?.item;
  console.log(item)

  const category = item.category

  const title = item.nameProduct

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.urlLinkImage.trim()}} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.container}>
      {/* banner */}
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.image}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.image.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      
      {/* //infor */}
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.nameProduct}</Text>
        <View style={styles.infoContainer}>

          {/* <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
            }
          > */}

            <Text style={styles.category}>
              {/* {getCategoryName(item.categoryId).toUpperCase()} */}
            </Text>
          {/* </TouchableHighlight> */}
        </View>

        <View style={styles.infoContainer}>
        
          <Text style={styles.infoRecipe}>Loại sản phẩm: {item.category.name}  </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              let ingredients = item.nameProduct;
              let title = "Ingredients for " + item.nameProduct;

              // button to order
              navigation.navigate("IngredientsDetails", {item});
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
