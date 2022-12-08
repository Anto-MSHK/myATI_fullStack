import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "react-native";
import { Badge, Button, Icon } from "@rneui/base";
import { ButtonSwitch } from "../ButtonSwitch/ButtonSwitch";
import { Card } from "@rneui/base";
import { useStyles } from "../../../hooks/useStyles";
import { UIstyles } from "../UIstyles";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { useTheme } from "@rneui/themed";
import { useAppDispatch } from "./../../../hooks/redux";
import { deleteGroup } from "../../../state/slices/group/groupSlice";
import { StackActions, useNavigation } from "@react-navigation/native";

interface GroupCardMiniI {
  name: string;
  withBtnClose?: boolean;
  onClickNav: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  isMain?: boolean;
}

export const GroupCardMini: FC<GroupCardMiniI> = ({
  name,
  onClickNav,
  onLayout,
  isMain = false,
  withBtnClose = false,
}) => {
  const navigation = useNavigation();
  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  return (
    <Card
      containerStyle={style.cardContainer_all}
      wrapperStyle={style.cardWrapper}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
          onLayout={onLayout}
          onTouchStart={() => {
            onClickNav();
            navigation.navigate("Home", { group: name });
            // navigation.dispatch(resetAction);
          }}
        >
          <View style={style.mainContainer}>
            <Text style={{ ...styleUI.h1_p, color: theme.colors.white }}>
              {name}
            </Text>
            {isMain && (
              <Text
                style={{
                  ...styleUI.h4_b,
                  color: theme.colors.white,
                  marginLeft: 10,
                }}
              >
                Моя группа
              </Text>
            )}
          </View>
        </View>
        {withBtnClose && (
          <Button
            radius={50}
            buttonStyle={{ width: 35, height: 35 }}
            color={theme.colors.secondary}
            onPress={() => {
              dispatch(deleteGroup(name));
            }}
            containerStyle={{ zIndex: 20 }}
          >
            <Icon
              name="close"
              type="antdesign"
              size={15}
              color={theme.colors.white}
            />
          </Button>
        )}
      </View>
    </Card>
  );
};
