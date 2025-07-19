import { itemStyles } from "./ItemStyles";
import { View, Image } from "react-native";
import Text from "../Text";

const TopRow = ({ repository }) => {

    return (
        <View style={itemStyles.topRow}>
            <Image style={itemStyles.picture}
                source={{ uri: `${repository.ownerAvatarUrl}` }}
            />
            <View style={itemStyles.textContainer}>
                <Text testID="name" fontSize='subheading' fontWeight='bold'>
                    {repository.fullName}
                </Text>
                <Text testID="description" color="textSecondary">{repository.description}</Text>
                <Text testID="language" style={itemStyles.language}>{repository.language}</Text>
            </View>
        </View>
    );
};

export default TopRow;