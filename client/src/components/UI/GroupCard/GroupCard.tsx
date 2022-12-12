import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "react-native";
import { Badge, Button, Icon } from "@rneui/base";
import { ButtonSwitch } from "./../ButtonSwitch/ButtonSwitch";
import { Card } from "@rneui/base";
import { useStyles } from "./../../../hooks/useStyles";
import { UIstyles } from "./../UIstyles";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { useTheme } from "@rneui/themed";

interface GroupCardI {
  name: string;
  faculty: string;
  onClickNav: (group: string) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const GroupCard: FC<GroupCardI> = ({
  name,
  faculty,
  onClickNav,
  onLayout,
}) => {
  const style = useStyles(styles);
  const { theme } = useTheme();

  return (
    <Card
      containerStyle={style.cardContainer_all}
      wrapperStyle={style.cardWrapper}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
        onLayout={onLayout}
      >
        <View style={style.mainContainer}>
          <Badge
            value={faculty === "FVO" ? "ФВО" : "СПО"}
            containerStyle={style.budgeContainer}
            badgeStyle={style.budge}
            textStyle={style.budgeText}
          />
          <Text style={style.h1}>{name}</Text>
        </View>
        <Button
          onPress={() => {
            onClickNav(name);
          }}
          radius={50}
          buttonStyle={{ width: 40, height: 40 }}
          color={theme.colors.primary}
        >
          <Icon
            name="arrowsalt"
            type="antdesign"
            size={20}
            color={theme.colors.black}
          />
        </Button>
      </View>
    </Card>
  );
};
