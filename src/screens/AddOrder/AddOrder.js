import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableHighlight,
    Button,
    Alert,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
    getIngredientName,
    getCategoryName,
    getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { FlatList } from "react-native-gesture-handler";
import SelectDropdown from 'react-native-select-dropdown';
import { SocketContext } from "../../context/SocketContext";
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const { width: viewportWidth } = Dimensions.get("window");

export default function AddOrder(props) {
    const [name, setName] = React.useState();
    const [product, setProduct] = useState([])
    const [listOrder, setListOrder] = useState([]);
    const [account, setAccount] = useState([]);
    const [infAccount, setInfAccount] = useState();
    const [total, setTotal] = useState([]);
    const [accountOrder, setAccountOrder] = useState();
    const [convertBodyOrder, setConvertBodyOrder] = useState([]);

    const context = useContext(SocketContext);
    console.log('context', context);


    var URLApi = "http://192.168.1.10:3000/get-all-prod";
    var URLApiAccount = "http://192.168.1.10:3000/admin/get-all-account-app";
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
                        setProduct(rs)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    },
        [])
        ;
    // call api account
    useEffect(() => {
        setTimeout(() => {
            fetch(URLApiAccount)

                .then(function (res) {
                    return res.json();
                }).then(function (rs) {
                    if (!rs) {
                        alert("error api, cant fetch !!!, Click again !")
                    } else {
                        let arr_account = [];
                        let arr_inf_account = [];
                        rs.map((item) => {
                            if (!item.admin) {
                                arr_account.push(item.name);
                                arr_inf_account.push(item);
                            }
                        })
                        setAccount(arr_account)
                        setInfAccount(arr_inf_account)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    },
        [])
        ;

    useEffect(() => {
        let totalOrder = 0;
        let arr_body_convert_prod = [];
        // setListOrder(listOrder);
        listOrder.map((item) => {
            totalOrder += (item.price * item.count)
            arr_body_convert_prod.push({
                prod: item.id,
                price: item.price,
                count: item.count,
            })
        })
        setTotal(totalOrder);
        setConvertBodyOrder(arr_body_convert_prod);

        console.log('re-render', listOrder);
    }, [listOrder]);


    // config back
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: "true",
            headerLeft: () => (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            ),
            headerRight: () => <View />,
        });
    }, []);

    // console.log('list-order: ', listOrder);
    //click item to order
    const saveInListOrder = (item) => {
        let arr_list_order = [...listOrder];

        if (arr_list_order.length == 0) {
            console.log('null array')
            setListOrder([{
                id: item._id,
                name: item.nameProduct,
                price: item.price,
                image: item.image[0].urlLinkImage,
                count: 1
            }])

        } else {

            let duplicate = false;
            for (let i = 0; i < arr_list_order.length; i++) {
                if (arr_list_order[i].id == item._id) {
                    console.log('duplicate item !');
                    arr_list_order[i].count++;
                    duplicate = true;
                }
            }
            if (duplicate === false) {
                arr_list_order.push({
                    id: item._id,
                    name: item.nameProduct,
                    price: item.price,
                    image: item.image[0].urlLinkImage,
                    count: 1
                })
            }


            setListOrder(arr_list_order)

        }
    }

    console.log('account', account)
    // fuction decrease item count
    const decreaseCountItem = (item) => {
        let arr_list_order = [...listOrder];
        for (let i = 0; i < arr_list_order.length; i++) {
            if (arr_list_order[i].id == item.id) {
                if (arr_list_order[i].count > 0) {
                    arr_list_order[i].count--;
                }
            }
        }
        setListOrder(arr_list_order)
    }

    // function delete item
    const deleteItemOrder = (item) => {
        let arr_list_order = [...listOrder];
        for (let i = 0; i < arr_list_order.length; i++) {
            if (arr_list_order[i].id == item.id) {
                arr_list_order.splice(i, 1)
            }
        }
        setListOrder(arr_list_order)
    }
    //return all prod
    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => saveInListOrder(item)} >
            <View style={styles.itemProduct}>
                <Image style={styles.photo} source={{ uri: item.image[0].urlLinkImage }} />
                <Text style={styles.title}>{item.nameProduct}</Text>
                <Text style={styles.price}>{item.price} đồng</Text>

            </View>
        </TouchableHighlight>
    );

    //return item order
    const renderItemOrder = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" >
            <View style={styles.itemProduct}>
                <Image style={styles.photo} source={{ uri: item.image }} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.price} đồng</Text>
                <Text style={styles.count}>Số lượng: {item.count}</Text>
                <Text style={styles.btnChangeCount} onPress={() => decreaseCountItem(item)}>Giảm SL</Text>
                <Text style={styles.btnDeleteItemOrder} onPress={() => deleteItemOrder(item)} >Xoá</Text>

            </View>
        </TouchableHighlight>
    )
    //function post api
    const postData = async (url = "", data = {}) => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    //add order
    const addOrder = async () => {



        let submit = true;
        if (!name) {
            submit = false;
            console.log('name empty')

        }
        if (total == 0) {
            submit = false;
            console.log('item empty')
        }
        if (accountOrder === undefined) {
            submit = false;
            console.log('account empty')
        }
        if (submit == false) {
            Alert.alert('Chưa đủ', 'Chưa chọn đủ thông tin để order !')
        } else {
            //
            let acc = infAccount[accountOrder]._id
            console.log(convertBodyOrder);
            let obj = {
                name: name,
                account: acc,
                product: convertBodyOrder
            }
            let rs = await postData("http://192.168.1.10:3000/add-to-cart-app", obj);
            console.log(rs);
            if (rs.status == "success") {
                context.sendMessageToSocket({
                    status: 'ok',
                    target: 'add-order',
                    content: 'Bàn: ' + name + ' đã được: ' + infAccount[accountOrder].name + ' thêm thành công !'
                })
                let save_alert = await postData("http://192.168.1.10:3000/add-alert", {
                    target: 'add-order',
                    content: 'Bàn: ' + name + ' đã được: ' + infAccount[accountOrder].name + ' thêm thành công !'
                })
                console.log(save_alert);
                navigation.navigate("ActiveTable", { message: 'render' });

                Alert.alert('Thành công', 'Bàn: ' + name + ' đã được: ' + infAccount[accountOrder].name + ' thêm thành công !')
            }
            //
        }
    }

    return (
        <>
            <View style={styles.listProduct}>

                <Text style={styles.title}>
                    Chọn sản phẩm
                </Text>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={product} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} />
            </View>

            <View style={styles.areaInfOrder}>
                <Text style={styles.title}>Thông tin order</Text>
                <View style={styles.itemNameTable}>
                    <Text>Nhập tên bàn: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                    />
                </View>
                <View style={styles.itemNameTable}>
                    <Text>Nv: </Text>

                    <SelectDropdown
                        buttonStyle={styles.dropdown}
                        rowTextStyle={styles.rowDropdown}
                        data={account}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setAccountOrder(index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </View>
                <View>
                    {/* <Text>
                        nhân viên đặt bàn chịu trách nhiệm cho bàn đã đặt
                    </Text> */}
                </View>
                <View style={styles.containItemOrder}>

                    <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={listOrder} renderItem={renderItemOrder} keyExtractor={(item) => `${item.id}`} />
                </View>

            </View>
            <View style={styles.areaTotalOrder}>
                <Text style={styles.title}>Tổng: {
                    total
                }
                </Text>
                <Button
                    onPress={addOrder}
                    title="Thêm order"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        </>


    );
}
