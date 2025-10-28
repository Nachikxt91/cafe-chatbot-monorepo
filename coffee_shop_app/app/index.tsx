import { router } from "expo-router";
import { ImageBackground } from "react-native";  // Changed from expo-image
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";  
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView 
        className="w-full h-full"
      >
        <ImageBackground
          className="w-full h-full items-center"
          source={require("../assets/images/index_bg_image.png")}
        >
        <View className="flex h-[60%]" />
        <View
          className="flex w-[80%]"
        >
        <Text className="text-white text-4xl text-center font-[Sora-SemiBold]">
          Fall in Love with Coffee in Blissful Delight!
        </Text>

        <Text
          className="pt-3 text-[#A2A2A2] text-center font-[Sora-Regular]"
        >
          Welcome to our cozy coffee corner, where every cup is delightful for you.
        </Text>

        <TouchableOpacity
          className="bg-[#C67C4E] mt-10 py-3 rounded-lg items-center" 
          onPress={() => {router.push("/(tabs)/home")}}
        >
          <Text
            className="text-xl text-white font-[Sora-SemiBold]"
          >
            Get Started
          </Text>
        </TouchableOpacity>

        </View>
        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
