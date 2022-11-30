import { BottomSheet, Button, Icon, ListItem, Text } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { FC, useState } from "react";
import { LayoutChangeEvent, StyleProp, View } from "react-native";
import Animated, {
  interpolate,
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
  opacity: any;
  heightScreen: number;
  posBtnClose: SharedValue<number>;
  onToggle: () => void;
}

export const BottomList: FC<BottomButtonsI> = ({
  list,
  posBtnClose,
  heightScreen,
  opacity,
  onToggle,
  visible,
}) => {
  const heightButtons = useSharedValue(0);

  const UIstyle = useStyles(UIstyles);

  const btnCloseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posBtnClose.value }],
    };
  });

  const measureHeight = (event: LayoutChangeEvent) => {
    event.persist();
    return event.nativeEvent.layout.height;
  };
  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            zIndex: 0,
            backgroundColor: "rgba(27, 32, 38, 0.7)",
            top: -heightScreen + 150,
            bottom: 0,
            right: 0,
            left: 0,
          },
          opacity,
        ]}
        onTouchStart={() => {
          if (visible) onToggle();
        }}
      />
      <Animated.View
        style={[
          {
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: theme.colors.grey5,
            paddingBottom: 50,
            bottom: -50,
          },
          btnCloseStyle,
        ]}
        onLayout={(event) => {
          heightButtons.value = measureHeight(event);
        }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
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
    </View>
  );
};

interface ButtonCloseListI {
  posBtnOpen: SharedValue<number>;
  onToggle: () => void;
  backgroundBtn: any;
  visible: boolean;
  btnSize: SharedValue<number>;
  btnSize2: SharedValue<number>;
}

export const ButtonCloseList: FC<ButtonCloseListI> = ({
  posBtnOpen,
  onToggle,
  backgroundBtn,
  visible,
  btnSize,
  btnSize2,
}) => {
  const btnOpenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posBtnOpen.value }],
    };
  });

  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();

  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(btnSize.value, [0, 100], [0, 1]);

    return {
      opacity: opacity,
    };
  });

  const opacityStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(btnSize2.value, [0, 100], [0, 1]);

    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          zIndex: 2,
          borderRadius: 50,
          marginLeft: 10,
          width: 60,
          height: 60,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        btnOpenStyle,
        backgroundBtn,
      ]}
      onTouchStart={onToggle}
    >
      <Animated.View style={[{ position: "absolute" }, opacityStyle2]}>
        <Icon name="close" type="antdesign" size={30} color={"white"} />
      </Animated.View>
      <Animated.View style={[{ position: "absolute" }, opacityStyle]}>
        <Icon name="filter" type="antdesign" size={30} color={"white"} />
      </Animated.View>
    </Animated.View>
  );
};
