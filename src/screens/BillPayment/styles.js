import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#EDEDED", 
    borderRadius: 10, 
    width: 250,
    justifyContent: "space-around"
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: 'grey' 
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,
  }
,
  containBillPayment:{
    width: '100%',
    padding: 5,
    maxHeight: 700,
    overflow: 'scroll'
  },
  categoriesItemContainer: {
    marginBottom: 20,
    padding: 4,
    borderLeftWidth: 2,
    backgroundColor: 'white'
  },
  categoriesPhoto: {
    width: 100
  },
  categoriesName:{
    fontWeight: "600",
    fontSize: 15,
    color: 'green',
    padding: 5,
    backgroundColor: 'green',
    color: 'white',
    textAlign: "center"
  },
  photo: {
    width: 50,
    height: 50
  },
  containDetailOrder:{

    width: '100%',
    flex: 1,
    minHeight: 35,
    flexDirection: 'column',
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    borderLeftColor: 'green',
    padding: 5,
    borderLeftWidth: 3
  },
  nameItemProduct: {
    height: 65,
  },
  totalBill: {
    fontWeight: '700',
    marginTop: 0,
  }
});

export default styles;
