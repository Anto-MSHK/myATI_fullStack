import { BottomSheet, Button, Icon, ListItem, Text } from "@rneui/base";
import { Badge, useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState } from "react";
import { LayoutChangeEvent, StyleProp, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useStyles } from "../../../hooks/useStyles";
import { UIstyles } from "../UIstyles";

interface BottomButtonsI {
  visible: boolean;
  list: any[];
  heightScreen: SharedValue<number>;
  opacityBackground: any;
  posModal: SharedValue<number>;
  onToggle: () => void;
}

export const BottomList: FC<BottomButtonsI> = ({
  list,
  posModal,
  heightScreen,
  opacityBackground,
  onToggle,
  visible,
}) => {
  const heightButtons = useSharedValue(0);

  const [active, setActive] = useState(true);
  const UIstyle = useStyles(UIstyles);
  const { theme } = useTheme();

  //   const opacityStyle = useAnimatedStyle(() => {
  //     const opacity = interpolate(opacityBackground.value, [0, 100], [0, 1]);

  //     return {
  //       opacity: opacity,
  //       top: -heightScreen.value,
  //     };
  //   });

  const posModalStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor: theme.colors.grey5,
      transform: [{ translateY: posModal.value }],
    };
  });

  const measureHeight = (event: LayoutChangeEvent) => {
    event.persist();
    return event.nativeEvent.layout.height;
  };
  const styleUI = useStyles(UIstyles);

  const backgroundStyle = useAnimatedStyle(() => {
    let z = interpolate(opacityBackground.value, [0, 1], [-1, 4]);
    return {
      opacity: opacityBackground.value,
      zIndex: opacityBackground.value === 0 ? -1 : 4,
    };
  });
  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            // zIndex: 0,
            backgroundColor: "red",
            borderRadius: 500,
            left: 0,
            top: -100,
            right: 0,
          },
          backgroundStyle,
        ]}
        onTouchStart={() => {
          if (visible) onToggle();
        }}
      >
        <LinearGradient
          colors={["rgba(27, 32, 38, 0.7)", "rgba(0, 0, 0, 0.9)"]}
          start={{ x: 0, y: 0.03 }}
          end={{ x: 0, y: 1 }}
          style={{
            width: 500,
            height: 1000,
            position: "absolute",
          }}
        ></LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,

            zIndex: 5,
            elevation: 5,
          },
          posModalStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: theme.colors.grey5,
              paddingBottom: 50,
              bottom: -50,
              zIndex: 5,
            },
            posModalStyle,
          ]}
          onLayout={(event) => {
            heightButtons.value = measureHeight(event);
          }}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={[l.containerStyle, { padding: 10 }]}
              onPress={l.onPress}
            >
              {l.icon && (
                <Icon name={l.icon} type="antdesign" color="white" size={25} />
              )}
              {l.title && (
                <Text
                  style={{
                    ...UIstyle.h2,
                    color: l.color,
                    marginLeft: 10,
                  }}
                >
                  {l.title}
                </Text>
              )}
              {l.children}
            </ListItem>
          ))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

interface ButtonCloseListI {
  posBtnOpen: SharedValue<number>;
  iconName: string;
  onToggle: () => void;
  colorBtn: SharedValue<number>;
  visible: boolean;
  opacityIconOpen: SharedValue<number>;
  opacityIconClose: SharedValue<number>;
  tags?: { name?: string; value: string }[];
}

export const ButtonCloseList: FC<ButtonCloseListI> = ({
  posBtnOpen,
  iconName,
  onToggle,
  colorBtn,
  opacityIconOpen,
  opacityIconClose,
  tags,
}) => {
  const btnOpenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posBtnOpen.value }],
    };
  });

  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();

  const opacityOpen = useAnimatedStyle(() => {
    const opacity = interpolate(opacityIconOpen.value, [0, 100], [0, 1]);

    return {
      opacity: opacity,
    };
  });

  const opacityClose = useAnimatedStyle(() => {
    const opacity = interpolate(opacityIconClose.value, [0, 100], [0, 1]);

    return {
      opacity: opacity,
    };
  });
  const colorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorBtn.value,
      [0, 1],
      [theme.colors.primary, "red"]
    );

    return {
      backgroundColor: backgroundColor,
      elevation: -1,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          zIndex: 6,
          width: 60,
          height: 60,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        },
        btnOpenStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            marginLeft: 10,
            width: 60,
            height: 60,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          },
          colorStyle,
        ]}
        onTouchStart={onToggle}
      >
        <Animated.View style={[{ position: "absolute" }, opacityClose]}>
          <Icon name="close" type="antdesign" size={30} color={"white"} />
        </Animated.View>
        <Animated.View style={[{ position: "absolute" }, opacityOpen]}>
          <Icon name={iconName} type="antdesign" size={30} color={"white"} />
        </Animated.View>
      </Animated.View>
      {tags &&
        tags.map(
          (tag, i) =>
            tag.value !== "" && (
              <Badge
                value={tag.name ? `${tag.value} ${tag.name}` : tag.value}
                containerStyle={{ marginBottom: 10, marginHorizontal: 5 }}
                badgeStyle={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 0,
                }}
                textStyle={{
                  textAlign: "center",
                  lineHeight: 12,
                  fontWeight: "700",
                }}
                key={i + "b"}
              />
            )
        )}
    </Animated.View>
  );
};
