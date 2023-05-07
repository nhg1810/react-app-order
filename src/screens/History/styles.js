import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: 100,
        overflow: 'scroll',
        marginTop: 3,
        backgroundColor: 'white',
      
    },
    viewLoader: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    photo: RecipeCard.photo,
    title: RecipeCard.title,
    category: RecipeCard.category
});

export default styles;
