import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Login Screen</Text>

      <Button
        title="Login"
        onPress={() => {
          router.replace("/(invoices)");
        }}
      />
    </View>
  );
}
