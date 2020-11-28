import Vue from 'vue';
import { 
    Tabbar, TabbarItem,
    Sticky,
    Search ,
    Swipe, SwipeItem,
    Lazyload,
    Grid, GridItem,
    Card ,
    Col, Row,
    Icon ,
    Sidebar, SidebarItem,
    Image as VanImage,
    Cell, CellGroup,
    Tag ,
    Button ,
    List ,
    NavBar ,
    Tab, Tabs,
    Field ,
    NumberKeyboard ,
    Sku ,
    Checkbox, CheckboxGroup,
    Stepper ,
    Empty ,
    SubmitBar ,
    ContactCard, ContactList, ContactEdit,
    AddressList,
    AddressEdit
 } from 'vant';
//组件注册
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Sticky);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Lazyload, {
    lazyComponent: true,
});
Vue.use(Tag);
Vue.use(Button);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Field);
Vue.use(NumberKeyboard);
Vue.use(Sku);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Empty);
Vue.use(SubmitBar);
Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(AddressList);
Vue.use(AddressEdit);