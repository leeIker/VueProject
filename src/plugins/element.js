/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button, FormItem, Container, Header, Aside, Main, Alert } from 'element-ui'
import { form } from 'element-ui'
import {
    Input,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Message,
    breadcrumb,
    BreadcrumbItem,
    card,
    Row,
    Col,
    Table,
    tableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tree,
    Tag,
    Select,
    Option,
    Divider,
    Cascader,
    Icon
} from 'element-ui'

Vue.use(Button)
Vue.use(form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(tableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Icon)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm