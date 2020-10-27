import React, { useContext } from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DiaryContext from "../context/DiaryContext";

//this components renders the 5 stars used as the book rating
const RatingStarts = ({ entry }) => {
  const { addRating } = useContext(DiaryContext);
  const { rating, _id } = entry;

  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {[...Array(5)].map((el, i) => (
        <FontAwesome
          //if the rating of the book is greater than the star number, the filled star is display, otherwise, the outline version is displayed
          name={`star${i < rating ? "" : "-o"}`}
          color="#FFC700"
          size={22}
          //when a star is pressed, its number representation is sent to the addRating() function
          onPress={() => addRating(_id, i + 1)}
          key={i}
        />
      ))}
    </View>
  );
};

export default RatingStarts;
