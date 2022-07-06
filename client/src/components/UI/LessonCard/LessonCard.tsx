import { View } from "react-native";
import React, { FC } from "react";
import { Badge, Card, Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { c_style } from "./../../../stylesConst";
import { ButtonSwitch } from "./../ButtonSwitch/ButtonSwitch";

interface LessonCardI {
  roundingСorns?: "none" | "top" | "bottom" | "all";
  isNotTeacher?: boolean;
  title: string;
  type: string;
  teacher: {
    name: string;
    degree?: string;
  };
  cabinet?: string;
}

export const LessonCard: FC<LessonCardI> = ({
  title,
  type,
  roundingСorns = "all",
  teacher,
  cabinet,
  isNotTeacher = false,
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
      <ButtonSwitch>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              left: -5,
              ...styles.secondaryText,
            }}
          >
            верхняя
          </Text>
          <Icon
            name="caretup"
            type="antdesign"
            size={15}
            color="white"
            style={{ marginRight: 8 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              left: -5,
              ...styles.secondaryText,
            }}
          >
            нижняя
          </Text>
          <Icon
            name="caretdown"
            type="antdesign"
            size={15}
            color="white"
            style={{ marginRight: 8 }}
          />
        </View>
      </ButtonSwitch>
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
          <View
            style={{
              flex: 1,
              marginRight: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              {!isNotTeacher && (
                <Text style={styles.secondaryText}>
                  {teacher.degree ? teacher.degree + " " : ""}
                  {teacher.name}
                </Text>
              )}
              <Text style={styles.secondaryText}>каб: {cabinet}</Text>
            </View>
            <Text style={styles.secondaryText_b}>{type}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
