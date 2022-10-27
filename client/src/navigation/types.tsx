import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TypeRootStackParamList = {
  Home: undefined;
  Groups: undefined;
};

export type RootStackScreenProps<T extends keyof TypeRootStackParamList> =
  NativeStackScreenProps<TypeRootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof TypeRootStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TypeRootStackParamList, T>,
    RootStackScreenProps<keyof TypeRootStackParamList>
  >;
