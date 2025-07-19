import { View, Linking } from "react-native";
import TopRow from "./TopRow";
import { itemStyles } from "./ItemStyles";
import BottomRow from "./BottomRow";
import Button from "../Button";

const RepositoryItem = ({ repository, showButton }) => {
  let forks = repository.forksCount;
  let reviews = repository.reviewCount;
  let stars = repository.stargazersCount;
  if (stars > 1000) stars = Math.round(stars / 1000 * 10) / 10 + "k";
  if (reviews > 1000) reviews = Math.round(reviews / 1000 * 10) / 10 + "k";
  if (forks > 1000) forks = Math.round(forks / 1000 * 10) / 10 + "k";


  return (
    <View style={itemStyles.container} testID="repositoryItem">
        <TopRow repository={repository} />
        <BottomRow stars={stars} reviews={reviews} forks={forks} rating={repository.ratingAverage} />
        {!!showButton && <Button backgroundColor="blue" text={"Open in GitHub"} onPress={() => Linking.openURL(repository.url)} />}
    </View>
  );
};



export default RepositoryItem;