import { Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useDispatch } from 'react-redux';
import { decrementCartItemQuantity, incrementCartItemQuantity } from '../slices/cartSlice';

const IMAGE_HEIGHT = 140
const IMAGE_WIDTH = 120
const SPACING_18 = 18
const SPACING_10 = 10

const CartItemCard = ({data} :any) => {
    const dispatch = useDispatch()
  return (
    <View style={styles.CartItemCardContainer}>
      <View style={styles.CartItemCardImageContainer}>
            <Image resizeMode='contain' style={styles.CartItemCardImage} source={{ uri : data.image}} />
      </View>
      <View style={styles.CartItemCardDetailsContainer}>
            <Text numberOfLines={2} style={styles.CartItemCardTitle}>{data.title}</Text>
            <View style={styles.CartItemCardRatingContainer}>
                <View style={styles.ProductRatingStarContainer}>
                    <StarRatingDisplay
                        starSize={23}
                        rating={data.rating.rate}
                        starStyle={{marginRight : -6}}
                    />
                </View>
                <Text style={styles.ProductRatingCount}>{data.rating.count}</Text>
            </View>
            <View style={styles.PriceQuantityContainer}>
                <Text style={styles.CartItemCardPriceText}>Rs. {data.price}</Text>
                <View style={styles.ProductQuantityContainer}>
                    <TouchableOpacity 
                        onPress={() => {
                            const id : any = data.id
                            dispatch(decrementCartItemQuantity(id))
                        }}
                        style={styles.ProductQuantityDecrementContainer}>
                        <Text style={styles.ProductQuantityDecrementSign}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.ProductQuantityTextContainer}>
                        <Text style={styles.ProductQuantityText}>{data.quantity}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            const id : any = data.id
                            dispatch(incrementCartItemQuantity(id))
                        }}
                        style={styles.ProductQuantityIncrementContainer}>
                        <Text style={styles.ProductQuantityIncrementSign}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={styles.CartItemCardCategory}>Category: {data.category}</Text>
      </View>
    </View>
  )
}

export default CartItemCard

const styles = StyleSheet.create({
    CartItemCardContainer : {
        borderWidth : 2,
        borderColor : "lightgrey",
        marginHorizontal : SPACING_18,
        marginTop : SPACING_18,
        borderRadius : SPACING_10,
        padding : SPACING_10,
        flexDirection : "row",
    },
    CartItemCardImageContainer : {

    },
    CartItemCardImage : {
        height: IMAGE_HEIGHT,
        width : IMAGE_WIDTH,
        overflow : "visible",
    },
    CartItemCardDetailsContainer : {
        marginLeft : SPACING_18,
    },
    CartItemCardTitle : {
        width : Dimensions.get("window").width-(SPACING_18*5 + IMAGE_WIDTH),
        color : "black",
        fontSize : 17,
        fontWeight : "500"
    },
    CartItemCardRatingContainer : {
        flexDirection : "row",
        alignItems : "center",
        marginTop : SPACING_10,
    },
    ProductRatingStarContainer : {

    },
    ProductRatingCount : {
        marginLeft : SPACING_10,
        color : "grey",
        fontWeight : "500"
    },
    PriceQuantityContainer : {
        flexDirection : "row",
        alignItems : "center",
        width : Dimensions.get("window").width-(SPACING_18*5 + IMAGE_WIDTH),
        justifyContent : "space-between",
        marginTop : SPACING_10
    },
    CartItemCardPriceText : {
        fontSize : 18,
        fontWeight : "800",
        color : "black",
    },
    ProductQuantityContainer : {
        flexDirection : "row",
    },
    ProductQuantityDecrementContainer : {
        backgroundColor : "lightgrey",
        padding : 7,
        borderTopLeftRadius: SPACING_10,
        borderBottomLeftRadius : SPACING_10,
        alignItems : "center",
        justifyContent: 'center',
    },
    ProductQuantityDecrementSign : {
        color : "black",
        fontSize : 18,
        fontWeight : "800"
    },
    ProductQuantityTextContainer : {
        backgroundColor : "lightgrey",
        padding : 7,
        alignItems : "center",
        justifyContent: 'center',
    },
    ProductQuantityText : {
        color : "black",
        fontSize : 18,
        fontWeight : "800"
    },
    ProductQuantityIncrementContainer : {
        backgroundColor : "lightgrey",
        padding : 7,
        borderTopRightRadius: SPACING_10,
        borderBottomRightRadius : SPACING_10,
        alignItems : "center",
        justifyContent: 'center',
    },
    ProductQuantityIncrementSign : {
        color : "black",
        fontSize : 18,
        fontWeight : "800"
    },
    CartItemCardCategory : {
        marginTop : SPACING_10,
        fontSize : 15,
        color : "grey",
        fontWeight : "500"
    }
})