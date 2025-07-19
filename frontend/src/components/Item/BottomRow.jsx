import { itemStyles } from "./ItemStyles";
import { View } from "react-native";
import Text from "../Text";

const BottomRow = ({ stars, forks, reviews, rating }) => {
    return (
        <View style={itemStyles.bottomRow}>
          <View style={itemStyles.infoContainer}>
            <Text testID="stars">{stars}</Text>
            <Text>Stars</Text>
          </View>
          <View style={itemStyles.infoContainer}>
            <Text testID="forks">{forks}</Text>
            <Text>Forks</Text>
          </View>
          <View style={itemStyles.infoContainer}>
            <Text testID="reviews">{reviews}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={itemStyles.infoContainer}>
            <Text testID="rating">{rating}</Text>
            <Text>Rating</Text>
          </View>
        </View>
    );
};

export default BottomRow;