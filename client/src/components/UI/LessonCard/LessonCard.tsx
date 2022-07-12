import { View } from "react-native";
import React, { FC } from "react";
import { Badge, Card, Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { c_style } from "./../../../stylesConst";
import { ButtonSwitch } from "./../ButtonSwitch/ButtonSwitch";
import { UIstyles } from "./../UIstyles";

export interface LessonCardI {
  roundingСorns?: "none" | "top" | "bottom" | "all";
  withSwitch?: boolean;
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
  teacher,
  cabinet,
  roundingСorns = "all",
  withSwitch = false,
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
      {withSwitch && (
        <ButtonSwitch
          buttons={[
            { text: "нижняя", icon: "caretdown", typeIcon: "antdesign" },
            { text: "верхняя", icon: "caretup", typeIcon: "antdesign" },
          ]}
        />
      )}
      <View>
        <View style={styles.mainContainer}>
          <Badge
            value={3}
            containerStyle={styles.budgeContainer}
            badgeStyle={styles.budge}
            textStyle={styles.budgeText}
          />
          <Text style={UIstyles.mainText}>{title}</Text>
        </View>
        <View style={styles.secondaryContainer}>
          <View style={styles.timeContainer}>
            <Text style={UIstyles.secondaryText_b}>12:30</Text>
            <View style={styles.stripe} />
            <Text style={UIstyles.secondaryText_b}>14:05</Text>
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
                <Text style={UIstyles.secondaryText}>
                  {teacher.degree ? teacher.degree + " " : ""}
                  {teacher.name}
                </Text>
              )}
              <Text style={UIstyles.secondaryText}>каб: {cabinet}</Text>
            </View>
            <Text style={UIstyles.secondaryText_b}>{type}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
