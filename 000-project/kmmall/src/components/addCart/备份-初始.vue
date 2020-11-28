<template>
        <div class="addCart">
            <van-icon class="addCart" name="cart-o" @click="show = !show" />
            <van-sku
                v-model="show"
                :sku="sku"
                :goods="goods"
                :goods-id="goodsId"
                :hide-stock="sku.hide_stock"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
            />
        </div>
</template>
<script>
    export default {
        name:'add-cart',
        data() {
            return {
                show: false,
                sku: {
                    // tree: this.makeSku(),
                    tree: [],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                        id: 2259, // skuId
                        s1: '001', // 规格类目 k_s 为 s1 的对应规格值 id
                        price: 10000, // 价格（单位分）
                        stock_num: 110 // 当前 sku 组合对应的库存
                        },
                        {
                        id: 2260, // skuId
                        s1: '002', // 规格类目 k_s 为 s1 的对应规格值 id
                        price: 9999, // 价格（单位分）
                        stock_num: 999 // 当前 sku 组合对应的库存
                        },
                    ],
                    price: '1.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    none_sku: false, // 是否无规格商品
                    hide_stock: false // 是否隐藏剩余库存
                },
                goods: {
                    // 默认商品 sku 缩略图
                    picture: this.mainImage
                },
            };
        },
        props:{
            goodsId:String,
            mainImage:String,
            skuTree:Array,
            price:Number,
            stock:Number,
        },
        methods:{
            onBuyClicked(){
                console.log('onBuyClicked')
                console.log(this.makeSku())
            },
            onAddCartClicked(){
                console.log('onAddCartClicked')
            },
            makeSku(){
                var tree=[];
                for(var i=0;i<this.skuTree.length;i++){
                    var obj = {};
                    obj.k = this.skuTree[i].key;
                    obj.k_s = this.skuTree[i]._id.toString();
                    obj.v = [];
                    for(var j=0;j<this.skuTree[i].value.split(',').length;j++){
                        var vObj = {};
                        vObj.id=j.toString();
                        vObj.name=this.skuTree[i].value.split(',')[j];
                        obj.v.push(vObj)
                    }
                    tree.push(obj)
                }
                return tree
            }
        }
        
    }
</script>
<style scoped lang="less">
    .addCart{
        text-align: right;
        .rem(font-size,22);
        color: #52c41a;
    }
</style>