import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Badge, Card, Icon, Text } from "@rneui/base";
import { styles } from "./styles";
import { c_style } from "./../../../stylesConst";
import { ButtonSwitch } from "./../ButtonSwitch/ButtonSwitch";
import { UIstyles } from "./../UIstyles";
import { dataLessonT, dataT, LessonT } from "../../../state/schedule/types";
import { LinearGradient } from "expo-linear-gradient";
import { useStyles } from "./../../../hooks/useStyles";
import { useAppSelector } from "../../../hooks/redux";

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

  const styleUI = useStyles(UIstyles);
  const style = useStyles(styles);

  var curRoundedStyle = {};
  switch (roundingСorns) {
    case "all":
      curRoundedStyle = style.cardContainer_all;
      break;
    case "top":
      curRoundedStyle = style.cardContainer_top;
      break;
    case "bottom":
      curRoundedStyle = style.cardContainer_bottom;
      break;
    case "none":
      curRoundedStyle = style.cardContainer_none;
      break;
  }

  return (
    <Card containerStyle={curRoundedStyle} wrapperStyle={style.cardWrapper}>
      {data.lowerWeek && (
        <View>
          <ButtonSwitch
            customStyle={styleForLine}
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
        </View>
      )}
      <View>
        <View style={style.mainContainer}>
          <Badge
            value={count}
            containerStyle={style.budgeContainer}
            badgeStyle={style.budge}
            textStyle={style.budgeText}
          />
          <Text style={{ width: 240, lineHeight: 18, ...styleUI.h2 }}>
            {data[curData]?.subject
              ? data[curData]?.subject && data[curData]?.subject.title
              : "Пары нет"}
          </Text>
        </View>
        {data[curData] && (
          <View style={style.secondaryContainer}>
            <View style={{ marginRight: 15, ...style.timeContainer }}>
              <Text style={styleUI.h3}>{time.from}</Text>
              <View style={style.stripe} />
              <Text style={styleUI.h3}>{time.to}</Text>
            </View>
            <View style={style.secondaryInfo}>
              <View>
                {!isNotTeacher && (
                  <Text style={styleUI.h3_b}>
                    {data[curData]?.teacher &&
                    data[curData]?.teacher.degree &&
                    data[curData]?.teacher.degree !== "undefined"
                      ? data[curData]?.teacher.degree + " "
                      : ""}
                    {data[curData]?.teacher
                      ? data[curData]?.teacher.name + " "
                      : ""}
                  </Text>
                )}
                {data[curData]?.cabinet && (
                  <Text style={styleUI.h3_b}>
                    каб: {data[curData]?.cabinet}
                  </Text>
                )}
              </View>
              {data[curData]?.subject && (
                <Text style={styleUI.h3}>{data[curData]?.subject.type}</Text>
              )}
            </View>
          </View>
        )}
      </View>
      {roundingСorns !== "bottom" && roundingСorns !== "all" && (
        <LinearGradient
          colors={["rgba(255,255,255,0.7)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={style.gradientLine}
        />
      )}
    </Card>
  );
};
