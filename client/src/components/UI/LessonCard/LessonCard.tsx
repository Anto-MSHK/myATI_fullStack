import { View } from "react-native";
import React, { FC } from "react";
import { Badge, Card, Text } from "@rneui/base";
import { styles } from "./styles";
import { c_style } from "./../../../stylesConst";

interface LessonCardI {
  roundingСorns?: "none" | "top" | "bottom" | "all";
  title: string;
  teacher: {
    name: string;
    degree?: string;
  };
  cabinet?: string;
}

export const LessonCard: FC<LessonCardI> = ({
  title,
  roundingСorns = "all",
  teacher,
  cabinet,
}) => {
  let curRoundedStyle = {};
  switch (roundingСorns) {
    case "all":
      curRoundedStyle = styles.cardContainer_all;
      break;
    case "top":
      curRoundedStyle = styles.cardContainer_top;
      break;
    case "bottom":
      curRoundedStyle = styles.cardContainer_bottom;
      break;
    case "none":
      curRoundedStyle = styles.cardContainer;
      break;
  }

  return (
    <Card containerStyle={curRoundedStyle} wrapperStyle={styles.cardWrapper}>
      <View>
        <View style={styles.mainContainer}>
          <Badge
            value={3}
            containerStyle={styles.budgeContainer}
            badgeStyle={styles.budge}
            textStyle={styles.budgeText}
          />
          <Text style={styles.mainText}>{title}</Text>
        </View>
        <View style={styles.secondaryContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.secondaryText_b}>12:30</Text>
            <View style={styles.stripe} />
            <Text style={styles.secondaryText_b}>14:05</Text>
          </View>
          <View>
            <Text style={styles.secondaryText}>
              {teacher.degree ? teacher.degree + " " : ""}
              {teacher.name}
            </Text>
            <Text style={styles.secondaryText}>каб: {cabinet}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
