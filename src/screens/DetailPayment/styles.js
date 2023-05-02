import { StyleSheet, Dimensions } from 'react-native';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc'
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 5
  },

  listProduct: {
    height: 200,
    marginTop: 40,
    overflow: 'scroll',
    maxHeight: 500,
    backgroundColor: 'white',
    borderLeftWidth: 3,
    borderLeftColor: '#cccccc'

  },
  listNewProduct: {
    height: 140,
    overflow: 'scroll',
    maxHeight: 500,
    backgroundColor: 'white',
    borderLeftWidth: 3,
    borderLeftColor: '#cccccc'
  },

  itemProduct: {
    flex: 1,
    flexDirection: 'row',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: 60
  },
  itemProductBefore: {
    opacity: 0.4,
    flex: 1,
    flexDirection: 'row',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: 60
  },
  price: {
    position: 'absolute',
    right: -20,
    bottom: 5,
    fontSize: 12
  },
  count: {
    position: 'absolute',
    right: -80,
    bottom: 5,
    fontSize: 12
  },
  areaInfOrder: {
    width: SCREEN_WIDTH,
    height: 250,
    marginTop: 5,
    backgroundColor: 'white',
    borderLeftWidth: 3
  },
  areaInfNewOrder: {
    width: SCREEN_WIDTH,
    height: 180,
    marginTop: 5,
    backgroundColor: 'white',
    borderLeftWidth: 3
  },
  areaTotalOrder: {
    width: SCREEN_WIDTH,
    height: 250,
    marginTop: 5,
    backgroundColor: 'white',
    borderLeftWidth: 3
  },
  itemNameTable: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    maxHeight: 40
  },
  btnChangeCount: {
    position: 'absolute',
    left: 70,
    color: 'red',
    padding: 2,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 4,
    top: -10,
    fontSize: 12
  },
  containItemOrder: {
    position: 'absolute',
    right: 0,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 200,
    overflow: 'scroll',
    borderLeftWidth: 2,
    borderLeftColor: '#cccccc',
    top: 30,

  },
  btnDeleteItemOrder: {
    position: 'absolute',
    left: 130,
    color: 'red',
    padding: 2,
    backgroundColor: 'yellow',
    color: 'red',
    borderRadius: 4,
    top: -10,
    fontSize: 12
  },
  dropdown: {
    height: 30,
    width: 100,
    backgroundColor: '#cccccc',
    borderRadius: 10
  },
  rowDropdown: {
    fontSize: 11,
  },
  itemTitleOldOrder: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#cccccc',
    color: 'white',
    marginLeft: 50
  }
});

export default styles;
