import React, { useContext } from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DiaryContext from "../context/DiaryContext";

const RatingStarts = ({ entry }) => {
  const { addRating } = useContext(DiaryContext);
  const { rating, _id } = entry;

  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {[...Array(5)].map((el, i) => (
        <FontAwesome
          name={`star${i < rating ? "" : "-o"}`}
          color="#FFC700"
          size={22}
          onPress={() => addRating(_id, i + 1)}
          key={i}
        />
      ))}
    </View>
  );
};

export default RatingStarts;
