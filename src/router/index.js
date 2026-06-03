import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import StudyProcessView from '@/views/studyProcess/StudyProcessView.vue'
import ProfileView from '../views/ProfileView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LoginView, meta: { hideNav: true } },
        { path: '/home', component: HomeView },
        { path: '/schedule', component: ScheduleView },
        { path: '/grades', component: StudyProcessView },
        { path: '/profile', component: ProfileView }
    ]
})