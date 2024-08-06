import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const IMAGE_HEIGHT = 140
const IMAGE_WIDTH = 120
const SPACING_18 = 18
const SPACING_10 = 10

const ProductCard = ({data} :any) => {
    
  return (
    <View style={styles.ProductCardContainer}>
      <View style={styles.ProductCardImageContainer}>
            <Image resizeMode='contain' style={styles.ProductCardImage} source={{ uri : data.image}} />
      </View>
      <View style={styles.ProductCardDetailsContainer}>
            <Text numberOfLines={2} style={styles.ProductCardTitle}>{data.title}</Text>
            <View style={styles.ProductCardRatingContainer}>
                <View style={styles.ProductRatingStarContainer}>
                    <StarRatingDisplay
                        starSize={23}
                        rating={data.rating.rate}
                        starStyle={{marginRight : -6}}
                    />
                </View>
                <Text style={styles.ProductRatingCount}>{data.rating.count}</Text>
            </View>
            <Text style={styles.ProductCardPriceText}>Rs. {data.price}</Text>
            <Text style={styles.ProductCardCategory}>Category: {data.category}</Text>
      </View>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    ProductCardContainer : {
        borderWidth : 2,
        borderColor : "lightgrey",
        marginHorizontal : SPACING_18,
        marginTop : SPACING_18,
        borderRadius : SPACING_10,
        padding : SPACING_10,
        flexDirection : "row",
    },
    ProductCardImageContainer : {

    },
    ProductCardImage : {
        height: IMAGE_HEIGHT,
        width : IMAGE_WIDTH,
        overflow : "visible",
    },
    ProductCardDetailsContainer : {
        marginLeft : SPACING_18,
    },
    ProductCardTitle : {
        width : Dimensions.get("window").width-(SPACING_18*5 + IMAGE_WIDTH),
        color : "black",
        fontSize : 17,
        fontWeight : "500"
    },
    ProductCardRatingContainer : {
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
    ProductCardPriceText : {
        fontSize : 18,
        fontWeight : "800",
        marginTop : SPACING_10,
        color : "black",
    },
    ProductCardCategory : {
        marginTop : SPACING_10,
        fontSize : 15,
        color : "grey",
        fontWeight : "500"
    }
})