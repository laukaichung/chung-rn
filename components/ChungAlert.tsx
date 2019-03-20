import * as React from "react"
import {ReactNode, useEffect, useState} from "react"
import Portal from "./portal/Portal";
import {Switch, View, ViewStyle} from "react-native";
import Styles from "./Styles";
import WhiteSpace from "./WhiteSpace";
import Button from "./Button";
import ChungText from "./ChungText";
import Overlay from "./Overlay";
import AsyncStorage from '@react-native-community/async-storage';

interface ChungAlertViewProps {
    storageKey: string;
    view: ReactNode;
    containerStyle?: ViewStyle;
}

const ChungAlert = (props: ChungAlertViewProps) => {
    const {containerStyle, view, storageKey} = props;
    const [show, setShow] = useState(false);
    const [doNotShowAgainVal, setDoNotShowAgainVal] = useState(true);

    useEffect(()=>{
        fetchInitialDataFromLocalStorage(props, setShow);
        return ()=>{

        }
    },[]);

    if (!show) {
        return null;
    }
    const alertView = (
        <Overlay
            enabled
            onPress={null}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={
                        [
                            {
                                padding: Styles.padding,
                                backgroundColor: Styles.backgroundColor,
                                borderColor: Styles.borderColor,
                                borderWidth: Styles.borderWidth,
                                borderRadius: 5,
                                margin: Styles.margin,
                                borderBottomWidth: 5,
                                borderBottomColor: Styles.secondaryColor
                            },
                            containerStyle
                        ]
                    }
                >
                    {view}
                    <WhiteSpace size="lg">
                        <Button
                            onPress={ async () => {

                                if (doNotShowAgainVal) {
                                    await AsyncStorage.setItem(storageKey, String(doNotShowAgainVal));
                                }

                                setShow(false)
                            }}
                            style={{alignSelf: 'center', paddingHorizontal: Styles.paddingXl}}
                        >
                            Close
                        </Button>
                        <WhiteSpace/>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <ChungText>
                                Do not show this message again.
                            </ChungText>
                            <Switch
                                value={doNotShowAgainVal}
                                onValueChange={async (newDoNotShowAgainVal) => {
                                    setDoNotShowAgainVal(newDoNotShowAgainVal);
                                }}
                            />
                        </View>
                    </WhiteSpace>
                </View>
            </View>
        </Overlay>
    );

    return (
        <Portal>
            {alertView}
        </Portal>
    );

};

async function fetchInitialDataFromLocalStorage({storageKey}: ChungAlertViewProps, setShow: (bool: boolean)=> void){
    if(storageKey) {
        const exist = await AsyncStorage.getItem(storageKey);
        console.log('exist?', exist);
        setShow(exist === null);
    }
}

export default ChungAlert;