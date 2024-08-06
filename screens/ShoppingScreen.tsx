import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, emptyTotalItemInCart } from '../slices/cartSlice.ts'
import CartItemCard from '../components/CartItemCard.tsx'

const IMAGE_HEIGHT = 160
const IMAGE_WIDTH = 140
const SPACING_18 = 18
const SPACING_10 = 10

const ShoppingScreen = () => {
    const [productList , setProductList] = useState([])
    const cartItemList = useSelector((state : any) => state.cart.CartList)
    const [openProductModal , setOpenProductModal] = useState(false)
    const [modalData , setModalData] = useState<any>({})
    const [selectedTab , setSelectedTab] = useState(0)

    const dispatch = useDispatch()
    const totalCartItem = useSelector((state : any) => state.cart.totalItemInCart)

    const addToCartButtonHandler = ({modalData} : any) => {
        const cartItemData : any = {
            image : modalData.image,
            title : modalData.title,
            id : modalData.id,
            price : modalData.price,
            category : modalData.category,
            rating : modalData.rating,
            quantity : 1,
        }
        dispatch(addToCart(cartItemData))
    }


    const fetchProductsFromApi = async () => {
        await fetch("http://fakestoreapi.com/products")
        .then((resp) => resp.json())
        .then((res) => {
            setProductList(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchProductsFromApi()
    } , [])

  return (
    <View style={styles.ShoppingScreenContainer}>
        <StatusBar backgroundColor={"black"} />
        <View style={styles.Header}>
            <TouchableOpacity
                onPress={() => {
                    setSelectedTab(0)
                }}
            >
                <Text style={[styles.HeaderTitle , { color : selectedTab===0 ? "black" : "grey"}]}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setSelectedTab(1)
                }}
            >
                <Text style={[styles.HeaderTitle , { color : selectedTab===1 ? "black" : "grey"}]}>
                    Cart List
                </Text>
                {totalCartItem!==0 && 
                    <View style={styles.TotalItemCart}>
                        <Text style={styles.TotalItemCartText}>{totalCartItem}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
        {selectedTab===0 ? (
            <FlatList
                data={productList}
                keyExtractor={(item :any) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setModalData(item)
                                setOpenProductModal(true)
                            }}
                        >
                            <ProductCard data={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        ) : (
            totalCartItem===0 ? 
            (
                <View style={{margin : SPACING_18}}>
                    <Text style={styles.NoItemCartText}>No items in Cart</Text>
                </View>
            )
            : 
            <FlatList
                data={cartItemList}
                keyExtractor={(item :any) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    // console.log(item)
                    return (
                        <CartItemCard data={item} />
                    )
                }}
            />
        )}
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={openProductModal}
            onRequestClose={() => {
                setOpenProductModal(!openProductModal)
            }}
        >
            <View style={styles.ProductInfoModalContainer}>
                <View style={styles.ProductInfoModalDataContainer}>
                <Image resizeMode='contain' style={styles.ProductInfoImage} source={{uri : modalData.image}} />
                <View style={styles.ProductInfoDescriptionContainer}>
                    <Text style={styles.ProductInfoDescriptionTitle}>Description: </Text>
                    <Text style={styles.ProductInfoDescriptionData}>{modalData.description} </Text>
                </View>
                <View style={styles.ProductInfoModalButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            addToCartButtonHandler({modalData})
                        }}
                        style={styles.AddToCartButtonContainer}
                    >
                        <Text style={styles.AddToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setOpenProductModal(false)
                        }}
                        style={styles.CloseButtonContainer}
                    >
                        <Text style={styles.CloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({
    ShoppingScreenContainer : {
        paddingBottom : SPACING_18*4.5,
    },
    Header : {
        backgroundColor : "#0cf1f5",
        padding : SPACING_18,
        flexDirection : "row",
        justifyContent : "space-around"
    },
    HeaderTitle : {
        color : "grey",
        fontSize : 19,
        textAlign : "center",
        fontWeight : "700"
    },
    TotalItemCart : {
        position: "absolute",
        top : -8,
        right : -20,
        backgroundColor : "lightgrey",
        borderRadius : 30,
        alignItems :"center",
        justifyContent: 'center',
        width : 20,
        height : 20,
    },
    TotalItemCartText : {
        color : "black"
    },
    NoItemCartText : {
        fontSize : 20,
        color : "black",
        fontWeight : "500",
        textAlign : "center"
    },
    ProductInfoModalContainer : {
        justifyContent : "center",
        alignItems : "center",
        elevation : 450,
        flex : 1,
        backgroundColor : 'rgba(0,0,0,0.5)'
    },
    ProductInfoModalDataContainer : {
        backgroundColor : "white",
        padding : SPACING_18*1.5,
        borderRadius : 12,
        alignItems : "center",
        justifyContent: 'center',
        marginHorizontal : SPACING_18,
    },
    ProductInfoModalButtonContainer : {
        flexDirection : "row",
        alignItems : "center",
        marginTop : SPACING_18
    },
    AddToCartButtonContainer : {
        backgroundColor : "red",
        padding : SPACING_10*1.3,
        borderRadius : 12,
        flex : 1
    },
    AddToCartText : {
        color : "white",
        fontWeight : "500",
        fontSize : 18,
        textAlign : "center"
    },
    CloseButtonContainer : {
        backgroundColor : "lightgrey",
        padding : SPACING_10*1.3,
        borderRadius : 12,
        marginLeft : SPACING_18,
        flex : 1
    },
    CloseButtonText : {
        color : "black",
        fontWeight : "500",
        fontSize : 18,
        textAlign : "center"
    },
    ProductInfoDescriptionContainer : {
        flexDirection : "row",
        width : Dimensions.get("screen").width-(SPACING_18*4.5),
        marginTop : SPACING_18,
    },
    ProductInfoDescriptionTitle : {
        fontSize : 17,
        color : "black",
        fontWeight : "500",
        width : 97
    },
    ProductInfoDescriptionData : {
        fontSize : 17,
        color : "black",
        fontWeight : "500",
        width : Dimensions.get("screen").width - (SPACING_18*4.5+97)
    },
    ProductInfoImage : {
        height: IMAGE_HEIGHT,
        width : IMAGE_WIDTH,
        overflow : "visible",
    }
})