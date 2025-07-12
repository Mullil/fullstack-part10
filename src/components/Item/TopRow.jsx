import { itemStyles } from "./ItemStyles";
import { View, Image } from "react-native";
import Text from "../Text";

const TopRow = ({ item }) => {
    return (
        <View style={itemStyles.topRow}>
            <Image style={itemStyles.picture}
                source={{ uri: `${item.ownerAvatarUrl}` }}
            />
            <View style={itemStyles.textContainer}>
                <Text fontSize='subheading' fontWeight='bold'>
                    {item.fullName}
                </Text>
                <Text color="textSecondary">{item.description}</Text>
                <Text style={itemStyles.language}>{item.language}</Text>
            </View>
        </View>
    );
};

export default TopRow;