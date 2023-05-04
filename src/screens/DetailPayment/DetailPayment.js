import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const { width: viewportWidth } = Dimensions.get("window");

export default function DetailPayment(props) {
    const [total, setTotal] = useState();
    const [moreTotal, setMoreTotal] = useState();

    const { navigation, route } = props;
    const [listOrder, setListOrder] = useState([]);

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
    const [deltailOrder, setDetailOrder] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('re render')
        setDetailOrder(route.params?.item);
        let l_total = 0;
        if (deltailOrder) {
            if (deltailOrder.product.length == route.params?.length) {
                setLoading(false);
            }
            console.log(deltailOrder.product.length)
            deltailOrder.product.map((item) => {
                l_total += item.price * item.count
            })
            setTotal(l_total);
            console.log(deltailOrder);
        }


    }, [props, route, deltailOrder])

    useEffect(() => {
        let totalOrder = 0;
        // setListOrder(listOrder);
        listOrder.map((item) => {
            totalOrder += (item.price * item.count)
        })
        setMoreTotal(totalOrder);
    }, [listOrder]);

    const [product, setProduct] = useState([])
    var URLApi = "https://fdf5-113-176-178-251.ngrok-free.app/get-all-prod";
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

    //return all prod
    const renderRecipes = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => saveInListOrder(item)}>
            <View style={styles.itemProduct}>
                <Image style={styles.photo} source={{ uri: item.image[0].urlLinkImage }} />
                <Text style={styles.title}>{item.nameProduct}</Text>
                <Text style={styles.price}>{item.price} đồng</Text>

            </View>
        </TouchableHighlight>
    );
    //return item order
    const renderItemOrder = ({ item }) => {
        if (item.prod) {
            console.log('meo', item)
            return <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" >
                <View style={styles.itemProductBefore}>
                    <Image style={styles.photo} source={{ uri: item.prod.image[0].urlLinkImage }} />
                    <Text style={styles.title}>{item.prod.nameProduct}</Text>
                    <Text style={styles.price}>{item.price} đồng</Text>
                    <Text style={styles.count}>Số lượng: {item.count}</Text>


                </View>
            </TouchableHighlight>
        } else {
            <></>
        }
    }



    //return item order
    const renderNewItemOrder = ({ item }) => (
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
    //update order
    const updateOrder = async () => {
        console.log('123');
        let arr_detail = deltailOrder;
        for (let i = 0; i < listOrder.length; i++) {
            let duplicate = false;
            arr_detail.product.map((item, index) => {
                if (item.prod._id === listOrder[i].id) {
                    duplicate = true;
                    arr_detail.product[index].count = parseInt(arr_detail.product[index].count) + parseInt(listOrder[i].count)
                }
            })
            if (!duplicate) {
                arr_detail.product.push({
                    count: listOrder[i].count,
                    price: listOrder[i].price,
                    prod: listOrder[i].id
                })
            }
            let api_obj = {
                _id: arr_detail._id,
                obj: {
                    product: arr_detail.product
                }
            }
            console.log(api_obj);

            let rs = await postData("https://fdf5-113-176-178-251.ngrok-free.app/update-order", api_obj);
            if (rs == 'success') {
                Alert.alert('Thành công', 'Thêm order thành công!');
                navigation.navigate("ActiveTable", { message: 'render' });
            }
        }
    }
    //payment
    const addPayment = async () => {
        console.log('payment...');
        let arr_detail = deltailOrder;
        if (listOrder.length) {
            for (let i = 0; i < listOrder.length; i++) {
                let duplicate = false;
                arr_detail.product.map((item, index) => {
                    if (item.prod._id === listOrder[i].id) {
                        duplicate = true;
                        arr_detail.product[index].count = parseInt(arr_detail.product[index].count) + parseInt(listOrder[i].count)
                    }
                })
                if (!duplicate) {
                    arr_detail.product.push({
                        count: listOrder[i].count,
                        price: listOrder[i].price,
                        prod: listOrder[i].id
                    })
                }
                let api_obj = {
                    _id: arr_detail._id,
                    obj: {
                        product: arr_detail.product,
                        status: true
                    }
                }
                console.log(api_obj);

                let rs = await postData("https://fdf5-113-176-178-251.ngrok-free.app/update-order", api_obj);
                if (rs == 'success') {
                    Alert.alert('Thành công', 'Thanh toán thành công ! Kiếm tra đơn đã thanh toán ở mục quản lí đơn');
                    navigation.navigate("ActiveTable", { message: 'render' });
                }
            }
        } else {
            let api_obj = {
                _id: arr_detail._id,
                obj: {
                    status: true
                }
            }
            let rs = await postData("https://fdf5-113-176-178-251.ngrok-free.app/update-order", api_obj);
            if (rs == 'success') {
                Alert.alert('Thành công', 'Thanh toán thành công ! Kiếm tra đơn đã thanh toán ở mục quản lí đơn');
                navigation.navigate("ActiveTable", { message: 'render' });
            }
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
            {
                loading ? (<></>) :
                    <>
                        <View style={styles.areaInfOrder}>
                            <Text style={styles.title}>Thông tin bàn</Text>
                            <View style={styles.itemNameTable}>
                                <Text>Tên bàn: {deltailOrder.name}</Text>
                            </View>
                            <View style={styles.itemNameTable}>
                                <Text>Nv: {deltailOrder.account.name}</Text>
                            </View>
                            <View style={styles.itemNameTable}>
                                <Button
                                    onPress={updateOrder}
                                    title="Cập nhật"
                                    color="green"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>

                            <View>
                                {/* <Text>
        nhân viên đặt bàn chịu trách nhiệm cho bàn đã đặt
    </Text> */}
                            </View>
                            <View style={styles.containItemOrder}>
                                <Text style={styles.itemTitleOldOrder}>Các order lúc trước</Text>
                                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={deltailOrder.product} renderItem={renderItemOrder} keyExtractor={(item) => `${item._id}`} />
                            </View>


                        </View>
                        <View style={styles.areaInfNewOrder}>
                            <Text style={styles.title}>Sản phẩm order thêm</Text>


                            <View style={styles.listNewProduct}>
                                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={listOrder} renderItem={renderNewItemOrder} keyExtractor={(item) => `${item.id}`} />
                            </View>


                        </View>

                        <View style={styles.areaTotalOrder}>
                            <Text style={styles.title}>Tổng: {
                                total
                            } + {moreTotal} = {total + moreTotal}
                            </Text>
                            <Button
                                onPress={addPayment}
                                title="Xử lí thanh toán"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />

                        </View>
                    </>
            }

        </>
    );
}
