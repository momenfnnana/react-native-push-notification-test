import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "@navigators"
// import MapView, { Marker, Polyline } from "react-native-maps"
import { Screen, Text } from "@components"
import { colors } from "@theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Map: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Map" component={MapScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MapScreen: FC<StackScreenProps<AppStackScreenProps, "Map">> = observer(
  function MapScreen() {
    const [state, setState] = useState({
      coords: [
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.75825, longitude: -122.4624 },
      ],
    })
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return <></>
  },
)

{
  /* <MapView
initialRegion={{
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}
style={{ flex: 1 }}
>
<Marker
  coordinate={{ latitude: state.coords[0].latitude, longitude: state.coords[0].longitude }}
  title={"Point A"}
/>
<Marker
  coordinate={{ latitude: state.coords[1].latitude, longitude: state.coords[1].longitude }}
  title={"Point B"}
/>
<Polyline coordinates={state.coords} strokeColor={colors.primary} strokeWidth={4} />
</MapView> */
}
