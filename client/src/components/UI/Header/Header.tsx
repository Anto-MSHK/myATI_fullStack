import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Header, useThemeMode, useTheme } from "@rneui/themed";
import { styles } from "./styles";
import { UIstyles } from "./../UIstyles";
import { useStyles } from "./../../../hooks/useStyles";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setTheme } from "../../../state/slices/settings/settingSlice";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Icon } from "@rneui/base";
import { GroupsList } from "../GroupsList/GroupsList";
import { ChangeTheme } from "../ChangeTheme/ChangeTheme";
interface HeaderMainI {
  title?: string;
  isNotActiveButton?: boolean;
}

export const HeaderMain: FC<HeaderMainI> = ({
  title = "My ATI",
  isNotActiveButton = false,
}) => {
  const dispatch = useAppDispatch();
  var themeMode = useAppSelector((state) => state.settings.theme);

  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  useEffect(() => {
    setMode(themeMode);
  }, []);

  const posX = useSharedValue(-400);
  const opacityBackG = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: posX.value }],
    //  opacity: opacity.value,
  }));

  const backgroundStyle = useAnimatedStyle(() => {
    let z = interpolate(opacityBackG.value, [0, 1], [-1, 15]);
    return {
      opacity: opacityBackG.value,
      zIndex: z,
    };
  });

  const managePanelActivity = (icon: "menuunfold" | "menufold") => {
    if (icon === "menuunfold") {
      posX.value = withSpring(0, { damping: 15 });
      opacityBackG.value = withSpring(1);
    } else {
      posX.value = withSpring(-400, { damping: 15 });
      opacityBackG.value = withSpring(0);
    }
    dispatch(setTheme(mode));
  };

  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  return (
    <View style={{}}>
      <Header
        backgroundColor={theme.colors.background}
        backgroundImageStyle={{}}
        centerComponent={{
          text: title,
          style: { ...styleUI.h1_p, color: theme.colors.black },
        }}
        centerContainerStyle={style.textContainer}
        containerStyle={{ ...style.header, borderBottomWidth: 0 }}
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
        leftComponent={
          !isNotActiveButton
            ? {
                icon: "menuunfold",
                type: "antdesign",
                color: theme.colors.black,
                size: 25,
                onPress: () => {
                  managePanelActivity("menuunfold");
                },
                style: style.button,
              }
            : undefined
        }
        leftContainerStyle={style.buttonContainer}
        placement="left"
      />
      <Animated.View
        style={[
          {
            zIndex: 20,
            width: 280,
            height: 1000,
            elevation: 20,
            position: "absolute",
            top: 42,
            paddingHorizontal: 10,
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            // left: 6,
            flexDirection: "row",
            width: 295,
            zIndex: 20,
            elevation: 20,
          }}
        >
          <Button
            type="clear"
            onPress={() => {
              managePanelActivity("menufold");
            }}
            //   style={[style.button]}
            containerStyle={[
              {
                borderRadius: 50,
                width: 45,
                height: 40,
              },
            ]}
          >
            <Icon
              name={"menufold"}
              type={"antdesign"}
              size={25}
              color={theme.colors.black}
            />
          </Button>
          <Text
            style={{
              ...styleUI.h1_b,
              color: theme.colors.black,
              textAlignVertical: "center",
              marginLeft: 10,
            }}
          >
            My ATI
          </Text>
          <Text
            style={{
              ...styleUI.h3,
              color: theme.colors.grey1,
              textAlignVertical: "center",
              marginLeft: 10,
            }}
          >
            v.0.5 -beta
          </Text>
        </View>
        <LinearGradient
          colors={[theme.colors.grey1, "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 2, bottom: -6, left: -25, marginRight: -28 }}
        />
        <GroupsList
          style={{}}
          onPressNav={() => managePanelActivity("menufold")}
        />
        <ChangeTheme style={{}} />
        <LinearGradient
          colors={[theme.colors.background, theme.colors.grey3]}
          start={{ x: 0, y: 0.03 }}
          end={{ x: 0, y: 1 }}
          style={{
            width: 295,
            height: 1000,
            left: -15,
            position: "absolute",
            zIndex: -1,
          }}
        ></LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          {
            width: 500,
            height: 1000,
            position: "absolute",
          },
          backgroundStyle,
        ]}
        onTouchStart={() => {
          posX.value = withSpring(-400, { damping: 15 });
          opacityBackG.value = withSpring(0);
        }}
      >
        <LinearGradient
          colors={[theme.colors.background, "rgba(0, 0, 0, 0.9)"]}
          start={{ x: 0, y: 0.03 }}
          end={{ x: 0, y: 1 }}
          style={{
            width: 500,
            height: 1000,
            position: "absolute",
          }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};
