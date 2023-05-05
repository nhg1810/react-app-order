import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';
import {  Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        minHeight: 100,
        borderColor: '#cccccc',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderRadius: 15
    },
    photo: RecipeCard.photo,
    title: RecipeCard.title,
    category: RecipeCard.category
});

export default styles;
