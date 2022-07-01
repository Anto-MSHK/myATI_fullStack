import { TypeRootStackParamList } from "./src/navigation/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TypeRootStackParamList {}
  }
}
