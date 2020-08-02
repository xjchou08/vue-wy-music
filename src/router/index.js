import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '发现音乐',
        component: () => import('../views/discovery.vue')
    },
    {
        path: '/discovery',
        name: '发现音乐',
        component: () => import('../views/discovery.vue')
    },
    {
        path: '/newsongs',
        name: '最新音乐',
        component: () => import('../views/NewMusic.vue')
    }, {
        path: '/movies',
        name: '推荐MV',
        component: () => import('../views/Mvs.vue')
    },
    {
        path: '/songs',
        name: '歌曲',
        component: () => import('../views/SongList.vue')
    },
    {
        path:'/result',
        name: '搜索结果',
        component: () => import('../views/Result.vue')
    },
    {
        path: '/detail',
        name: '歌曲详情',
        component: () =>import('../views/detail.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
