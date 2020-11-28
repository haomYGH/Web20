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
    import api from '@api'
    export default {
        name:'add-cart',
        data() {
            return {
                show: false,
                sku:this.makeSku(),
                /*
                sku: {
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                            v: [
                                {
                                id: '001', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                },
                                {
                                id: '002', // skuValueId：规格值 id
                                name: '蓝色', // skuValueName：规格值名称
                                },
                            ],
                        }
                    ],
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
                    stock_num: 8888, // 商品总库存
                    none_sku: false, // 是否无规格商品
                    hide_stock: false // 是否隐藏剩余库存
                },
                */
                goods: {
                    // 默认商品 sku 缩略图
                    picture: this.itemData.mainImage
                },
            };
        },
        props:{
            goodsId:String,
            itemData:Object
        },
        methods:{
            onBuyClicked(v){
                console.log('onBuyClicked',v)
            },
            onAddCartClicked(v){
                console.log('onAddCartClicked',v)
                let sku1 = Object.keys(v.selectedSkuComb);
                let sku2 = Object.values(v.selectedSkuComb);
                // let attr = sku1[1] +":"+ sku2[1] +";";
                // let count = v.selectedNum;
                // let productId = v.goodsId;
                api.addCart({
                    attr : sku1[1] +":"+ sku2[1] +";",
                    count : v.selectedNum,
                    productId : v.goodsId,
                })
            },
            makeSku(){
                //为了跟后台接受数据格式接轨，我现在需要把terr下的k_s改为颜色，v里面的id改为对应色
                //与之一一对应的list也要改
                var sku={};
                var tree=[];
                var list=[];
                for(var i=0;i<this.itemData.attrs.length;i++){
                    var obj = {};
                    obj.k = this.itemData.attrs[i].key;
                    // obj.k_s = this.itemData.attrs[i]._id.toString();
                    obj.k_s = '颜色';
                    obj.v = [];
                    for(var j=0;j<this.itemData.attrs[i].value.split(',').length;j++){
                        var vObj = {};
                        // vObj.id=j.toString();
                        vObj.id=this.itemData.attrs[i].value.split(',')[j];
                        vObj.name=this.itemData.attrs[i].value.split(',')[j];
                        obj.v.push(vObj);
                        //list
                        var listObj = {};
                        listObj.id = j;
                        listObj[obj.k_s] = vObj.id;//对应关系
                        listObj.price = (this.itemData.price * 100 / 1).toFixed(2);//单位为分
                        listObj.stock_num = this.itemData.stock;
                        list.push(listObj)
                    }
                    tree.push(obj)
                }
                sku.tree = tree;
                sku.list = list;
                sku.price = (this.itemData.price / 1).toFixed(2);
                sku.stock_num = this.itemData.stock;
                sku.none_sku = false;
                sku.hide_stock = false;
                return sku
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