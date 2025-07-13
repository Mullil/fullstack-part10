import { View } from "react-native";
import TopRow from "./TopRow";
import { itemStyles } from "./ItemStyles";
import BottomRow from "./BottomRow";

const RepositoryItem = ({ item }) => {
  let forks = item.forksCount;
  let reviews = item.reviewCount;
  let stars = item.stargazersCount;
  if (stars > 1000) {
    stars = Math.round(stars / 1000 * 10) / 10;
    stars = stars + "k"
  }
  if (reviews > 1000) {
    reviews = Math.round(reviews / 1000 * 10) / 10;
    reviews = reviews + "k"
  }
  if (forks > 1000) {
    forks = Math.round(forks / 1000 * 10) / 10;
    forks = forks + "k"
  }
  return (
    <View style={itemStyles.container}>
        <TopRow item={item} />
        <BottomRow stars={stars} reviews={reviews} forks={forks} rating={item.ratingAverage} />
    </View>


  );
};

export default RepositoryItem