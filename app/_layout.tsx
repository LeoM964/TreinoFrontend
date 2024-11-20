import { Stack } from "expo-router";

//Retirar o Header com Index escrito
export default function RootLayout () { 
  return (
    <Stack>
      <Stack.Screen
      name="index"
      options={{
        headerShown: false
      }}
      />
    </Stack>
  )
}