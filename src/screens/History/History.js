import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, ActivityIndicator } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import ToastNotification from "../../Toast/toast";
import { SocketContext } from "../../context/SocketContext";

export default function History(props) {
    const [alert, setAlert] = useState([])
    const { server } = useContext(SocketContext);
    const [loader, setLoader] = useState(true);
    var URLApi = "http://192.168.1.26:3000/get-all-alert";
    //fetch data get all prod
    // call api
    useEffect(() => {
        setTimeout(() => {
            fetch(URLApi)

                .then(function (res) {
                    return res.json();
                }).then(function (rs) {
                    if (!rs) {
                        alert("error api, cant fetch !!!, Click again !")
                    } else {
                        setAlert(rs)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    },
        [server])
        ;

    const { navigation } = props;
    useEffect(() => {
        if (alert) {
            setTimeout(function () {
                setLoader(false);

            }, 2000)
        }
    }, [alert])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MenuImage
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            ),
            headerRight: () => <View />,
        });
    }, []);
    const renderRecipes = ({ item }) => {
        if (item.target === 'add-order') {
            return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
                <View style={styles.container}>
                    <ToastNotification data={item.content} background={'#20639B'} styles={{ top: 0 }}>

                    </ToastNotification>
                </View>
            </TouchableHighlight>)
        } else if (item.target === 'update-bill') {
            return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
                <View style={styles.container}>
                    <ToastNotification data={item.content} background={'#f4c05f'} styles={{ top: 0 }}>

                    </ToastNotification>
                </View>
            </TouchableHighlight>)
        }
        else if (item.target === 'payment-successful') {
            return (<TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
                <View style={styles.container}>
                    <ToastNotification data={item.content} background={'green'} styles={{ top: 0 }}>

                    </ToastNotification>
                </View>
            </TouchableHighlight>)
        }

    };

    return (
        loader ?
            <View style={styles.viewLoader}>
                <ActivityIndicator size="large" />
                <Text>Đang tải...</Text>
            </View> :
            <View>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={alert} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} />
            </View>
    );
}
