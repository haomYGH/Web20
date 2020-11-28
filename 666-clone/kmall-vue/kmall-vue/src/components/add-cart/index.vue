<template>
    <div class="AddCart" @click.stop="">
      <van-goods-action-button v-if="isActionButton" type="warning" @click.stop="showSku">
        加入购物车
      </van-goods-action-button>        
        <van-icon v-else class="cart-btn" name="cart-o" @click.stop="showSku" />
        <van-sku 
            v-model="show"
            :sku="sku" 
            :goods="goods" 
            :goods-id="product._id" 
            :hide-stock="sku.hide_stock"
            :show-add-cart-btn="false"
            :hide-quota-text="true"
            @buy-clicked="onAddCartClicked" 
            buy-text="确定"
        />
        </van-sku>
    </div>
</template>
<script>
import { ADD_CARTS} from 'pages/cart/store/types.js'
import api from 'api'
import { getUsername } from 'util'
export default {
    name: 'AddCart',
    props: {
        product: Object,
        isActionButton: Boolean
    },
    data() {
        return {
            show: false,
            sku: this.makeSku(),
            goods: {
              // 商品标题
              title: this.product.name,
              // 默认商品 sku 缩略图
              picture: this.product.mainImage
            },
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        makeSku(){
            const product = this.product;
            const attrs = product.attrs || [];
            // console.log(attrs)
            
            const sku = {
                price: product.price && product.price.toFixed(2), // 默认价格（单位元）
                stock_num: product.stock, // 商品总库存
                none_sku: false, // 是否无规格商品
                hide_stock: false // 是否隐藏剩余库存
            }
            
            sku.tree = attrs.map((attr)=>{
                return {
                    k:attr['key'],
                    v:attr['value'].split(',').map(v=>({id:v,name:v})),
                    k_s:attr['key']
                }
            })
            // console.log(sku.tree)
            //注意 此处的处理只支持2组规格的选择
            let list = []
            const attrsLength = attrs.length
            if(attrsLength == 1){
                let key = attrs[0]['key']
                let vals = attrs[0]['value'].split(',')
                for(let i=0;i<vals.length;i++ ){
                    let item = {
                        price:product.price*100,
                        stock_num:product.stock,
                    }                    
                    item.id = '0'+i
                    item[key] = vals[i]
                    list.push(item)
                }                 
            }else if(attrsLength == 2){
                let tmpList = []
                let key = attrs[0]['key']
                let vals = attrs[0]['value'].split(',')
                for(let i=0;i<vals.length;i++ ){
                    let item = {
                        price:product.price*100,
                        stock_num:product.stock,
                    }                    
                    item[key] = vals[i]
                    tmpList.push(item)
                }
                let key2 = attrs[1]['key']
                let vals2 = attrs[1]['value'].split(',')
                for(let j=0;j<tmpList.length;j++){
                    for(let k=0;k<vals2.length;k++ ){
                        let item = {
                            ...tmpList[j],
                        }                 
                        item.id = j+''+k
                        item[key2] = vals2[k]
                        list.push(item)
                    }                    
                }
            }
            sku.list = list
            // console.log(attrsLength)
            // console.log(sku.list)
            return sku;
        },
        onAddCartClicked(op){
            // console.log(op)

            let sku = {...op.selectedSkuComb}
            delete sku.id
            delete sku.price
            delete sku.stock_num
            let attr = ''
            for(let key in sku){
                attr += key+":"+ sku[key]+';'
            }
            // console.log(attr)
            this.$store.dispatch({
                type:ADD_CARTS,
                payload:{
                    productId:op.goodsId,
                    count:op.selectedNum,
                    attr:attr
                }
            })
            .then(()=>{
                this.$toast.success({
                    message:'添加购物车成功',
                    onClose:()=>{
                        this.show = false
                    }
                })
            })
        },
        showSku(){
            if(!getUsername()){
                this.$router.push('/login')
                return;
            }             
            this.show = true
        }
    }
}
</script>
<style scoped lang="less" scoped>
.AddCart {
    
}
</style>