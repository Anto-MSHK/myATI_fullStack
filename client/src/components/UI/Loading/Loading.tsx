import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { GroupsList, GroupsListMin } from "../GroupsList/GroupsList";
import { useStyles } from "../../../hooks/useStyles";
import { UIstyles } from "../UIstyles";
import { useTheme } from "@rneui/themed";

interface LoadingI {
  withGroups?: boolean;
}
export const Loading = ({ withGroups = false }) => {
  const [isWait, setIsWait] = useState(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsWait(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const stylesUI = useStyles(UIstyles);
  const { theme } = useTheme();
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Button
        size="lg"
        loadingProps={{ size: "large" }}
        loading
        color={theme.colors.primary}
        type="clear"
        style={{ position: "absolute" }}
      />
      {isWait && (
        <>
          {/* <Text
            style={{
              ...stylesUI.h2_p,
              color: theme.colors.black,
              textAlign: "center",
            }}
          >
            Проблема у вас или у нас...
          </Text> */}
          {withGroups && <GroupsListMin style={{}} onPressNav={() => {}} />}
        </>
      )}
    </View>
  );
};
