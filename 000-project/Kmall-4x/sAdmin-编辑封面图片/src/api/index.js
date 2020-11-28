const SERVER = 'http://127.0.0.1:3000/';//服务器端口

export const ADMIN_LOGIN = SERVER +  'sessions/users'
export const USER_LOGOUT = SERVER +  'user/logout'
export const ADMIN_COUNTS = SERVER +  'counts'
export const GET_USERS = SERVER +  'users/list'
export const Add_Categories = SERVER +  'categories'
export const Get_LevelCategories = SERVER +  'categories/levelCategories'
export const Get_CategoriesList = SERVER +  'categories/list'

export const UPDATE_CATEGORY_Name = SERVER +  'categories/name'
export const UPDATE_CATEGORY_mobileName = SERVER +  'categories/mobileName'
export const UPDATE_CATEGORY_Order = SERVER +  'categories/order'
export const UPDATE_CATEGORY_isShow = SERVER +  'categories/isShow'

export const UPLAOD_IMAGES = SERVER +  'products/images'
export const UPLAOD_PRODUCT_DETAIL_IMAGES = SERVER +  'products/detailImages'

export const ADD_PRODUCT = SERVER +  'products/'
export const api_GET_ProductEdit = SERVER +  'products/detail'

export const GET_ProductsList = SERVER +  'products/list'
export const api_Update_IsShow = SERVER +  'products/isShow'
export const api_Update_Status = SERVER +  'products/status'
export const api_Update_IsHot = SERVER +  'products/isHot'
export const api_Update_Order = SERVER +  'products/order'