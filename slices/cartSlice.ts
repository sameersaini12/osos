import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CartList : [],
    totalItemInCart : 0
}

export const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state : any , action : any) => {
            let found = false
            let cartItem  = action.payload
            for(let i=0;i<state.CartList.length;i++) {
                if(state.CartList[i].id == cartItem.id) {
                    found = true
                    state.CartList[i].quantity++
                    break;
                }
            }
            if(found==false){
                state.CartList.push(cartItem)
            }
            state.totalItemInCart = state.totalItemInCart+1
        },
        incrementCartItemQuantity : (state : any , action : any) => {
            const id = action.payload
            for(let i=0;i<state.CartList.length;i++) {
                if(state.CartList[i].id == id) {
                    state.CartList[i].quantity++
                    break;
                }
            }
            state.totalItemInCart = state.totalItemInCart+1
        },
        decrementCartItemQuantity : (state : any , action : any) => {
            const id = action.payload

            for(let i=0;i<state.CartList.length;i++) {
                if(state.CartList[i].id == id) {
                    if(state.CartList[i].quantity > 1) {
                        state.CartList[i].quantity--;
                    }else {
                        state.CartList.splice(i,1)
                    }
                }
            }
            state.totalItemInCart = state.totalItemInCart-1
        },
        emptyTotalItemInCart : (state : any) => {
            state.totalItemInCart = 0,
            state.CartList = []
        }
    }
})

export const {
    addToCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    emptyTotalItemInCart
} = cartSlice.actions

export default cartSlice.reducer