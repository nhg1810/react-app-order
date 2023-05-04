import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Button, Alert } from "react-native";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import styles from "./style";

export default function AccountScreen(props) {
    // list of table
    const [account, setAccount] = useState([])
    var URLApi = "https://fdf5-113-176-178-251.ngrok-free.app/admin/get-all-account-app";
    //fetch data get all prod
    // call api
    useEffect(() => {
        setTimeout(() => {
            fetch(URLApi)

                .then(function (res) {
                    return res.json();
                }).then(function (rs) {
                    var temp_arr = []
                    rs.map((acc) => {
                        if (!acc.admin) {
                            temp_arr.push(acc);

                        }
                    })
                    setAccount(temp_arr)

                    if (!rs) {
                        alert("error api, cant fetch !!!, Click again !")
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    },
        [])
        ;


    const { navigation } = props;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                flex: 1,
            },
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


    const renderAccount = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                width: '100%',
                height: 80,
                marginLeft: 10,
                backgroundColor: 'white',
                borderColor: '#cccccc',
                borderWidth: 0.5,
                borderRadius: 15
            }}>
                {/* <Image style={styles.photo} source={{ uri: item.image[0].urlLinkImage }} /> */}
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.category}>{item.email}</Text>
            </View >


        </TouchableHighlight>
    );
    return (
        <View>
            <Text style={{
                width: '100%',
                padding: 5,
                textAlign: 'center',
                backgroundColor: 'white'
            }}>
                Tất cả các tài khoản đang có
            </Text>
            <View style={{

            }}>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={account} renderItem={renderAccount} keyExtractor={(item) => `${item._id}`} />
              
            </View>

        </View>
    )
}
