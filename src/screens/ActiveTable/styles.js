import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewLoader: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  categoriesItemContainer: {
    width: 150,
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 200,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    overflow: 'scroll'
  },
  areaContainTable: {
    flex: 1,
    alignItems: 'center',
    marginTop: 3,
    height: 400,
    width: '100%',
    backgroundColor: 'white'
  },
  categoriesPhoto: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  categoriesName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#333333',
    marginLeft: 5,
    marginTop: 8
  },
  categoriesInfo: {
    borderLeftWidth: 2,
    borderLeftColor: 'green',
    paddingLeft: 5,
    marginLeft: 3,
    marginTop: 3,
    marginBottom: 5
  }
});

export default styles;
