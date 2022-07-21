import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import React, { FC, useState } from "react";
import { Badge, Card, Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { c_style } from "./../../../stylesConst";
import { ButtonSwitch } from "./../ButtonSwitch/ButtonSwitch";
import { UIstyles } from "./../UIstyles";
import { dataLessonT, dataT, LessonT } from "../../../state/schedule/types";
import { LinearGradient } from "expo-linear-gradient";

export interface LessonCardI {
  roundingСorns?: "none" | "top" | "bottom" | "all";
  withSwitch?: boolean;
  isNotTeacher?: boolean;
  count: 1 | 2 | 3 | 4 | 5;
  time: { from: string; to: string };
  data: dataT;
}

export const LessonCard: FC<LessonCardI> = ({
  data,
  count,
  time,
  roundingСorns = "all",
  isNotTeacher = false,
}) => {
  var styleForLine: StyleProp<ViewStyle> = {};
  var [curData, setCurData] = useState<"topWeek" | "lowerWeek">("topWeek");

  const toggleData = (selectedIndex?: number) => {
    if (selectedIndex === 0) setCurData("topWeek");
    else if (selectedIndex === 1) setCurData("lowerWeek");
  };

  var curRoundedStyle = {};
  switch (roundingСorns) {
    case "all":
      curRoundedStyle = styles().cardContainer_all;
      break;
    case "top":
      curRoundedStyle = styles().cardContainer_top;
      break;
    case "bottom":
      curRoundedStyle = styles().cardContainer_bottom;
      break;
    case "none":
      curRoundedStyle = styles().cardContainer_none;
      break;
  }

  return (
    <Card containerStyle={curRoundedStyle} wrapperStyle={styles().cardWrapper}>
      {data.lowerWeek && (
        <ButtonSwitch
          style={styleForLine}
          buttons={{
            items: [
              {
                text: "верхняя",
                icon: "caretup",
                typeIcon: "antdesign",
              },
              {
                text: "нижняя",
                icon: "caretdown",
                typeIcon: "antdesign",
              },
            ],
            customOnPress: toggleData,
          }}
        />
      )}
      <View>
        <View style={styles().mainContainer}>
          <Badge
            value={count}
            containerStyle={styles().budgeContainer}
            badgeStyle={styles().budge}
            textStyle={styles().budgeText}
          />
          <Text style={{ width: 240, lineHeight: 18, ...UIstyles().h2 }}>
            {data[curData]?.subject.title}
          </Text>
        </View>
        <View style={styles().secondaryContainer}>
          <View style={{ marginRight: 15, ...styles().timeContainer }}>
            <Text style={UIstyles().h3}>{time.from}</Text>
            <View style={styles().stripe} />
            <Text style={UIstyles().h3}>{time.to}</Text>
          </View>
          <View style={styles().secondaryInfo}>
            <View>
              {!isNotTeacher && (
                <Text style={UIstyles().h3_b}>
                  {data[curData]?.teacher.degree
                    ? data[curData]?.teacher.degree + " "
                    : ""}
                  {data[curData]?.teacher.name}
                </Text>
              )}
              <Text style={UIstyles().h3_b}>каб: {data[curData]?.cabinet}</Text>
            </View>
            <Text style={UIstyles().h3}>{data[curData]?.subject.type}</Text>
          </View>
        </View>
      </View>
      {roundingСorns !== "bottom" && roundingСorns !== "all" && (
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,0.7)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles().gradientLine}
          //   style={styles.background}
        />
      )}
    </Card>
  );
};
