import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    width: '100%',
    height: '100%',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: 'white'
  },
  containProduct:{
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  viewLoader: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  }
});

export default styles;
