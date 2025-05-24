// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Импорт view-компонентов
import HomeView         from '../views/HomeView.vue'
import TeamView         from '../views/TeamView.vue'
import MaterialsView    from '../views/MaterialsView.vue'
import PresentationsView from '../views/PresentationsView.vue'
import VideoMaterialsView from '../views/VideoMaterialsView.vue'
import ContactsView     from '../views/ContactsView.vue'
import NewsView from '@/views/NewsView.vue'
import AnnouncementsView from '@/views/AnnouncementsView.vue'

const routes = [
  { path: '/',            name: 'home',          component: HomeView },
  { path: '/team',        name: 'team',          component: TeamView },
  { path: '/materials',   name: 'materials',     component: MaterialsView },
  { path: '/presentations',name:'presentations', component: PresentationsView },
  { path: '/videomaterials',name:'videoMaterials',component: VideoMaterialsView },
  { path: '/contacts',    name: 'contacts',      component: ContactsView },
  { path: '/news',    name: 'news',      component: NewsView },
  { path: '/announcements',    name: 'announc',      component: AnnouncementsView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

