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

interface GroupCardMiniI {
  name: string;
  faculty: string;
  onClickNav: (group: string) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const GroupCardMini: FC<GroupCardMiniI> = ({
  name,
  faculty,
  onClickNav,
  onLayout,
}) => {
  const style = useStyles(styles);
  const styleUI = useStyles(UIstyles);
  const { theme } = useTheme();

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
        onLayout={onLayout}
      >
        <View style={style.mainContainer}>
          <Text style={{ ...styleUI.h1_p, color: theme.colors.white }}>
            {name}
          </Text>
        </View>
        <Button
          onPress={() => {
            onClickNav(name);
          }}
          radius={50}
          buttonStyle={{ width: 35, height: 35 }}
          color={theme.colors.secondary}
        >
          <Icon
            name="close"
            type="antdesign"
            size={15}
            color={theme.colors.white}
          />
        </Button>
      </View>
    </Card>
  );
};
