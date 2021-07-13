import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import PageNotFound from './components/nav/PageNotFound.vue';
import TeamsFooter from './components/teams/TeamFooter.vue';
import UsersFooter from './components/users/UserFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' }, // prosty redirect
        {
            name: 'teams',
            path: '/teams',
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            name: 'users',
            path: '/users', components: { default: UsersList, footer: UsersFooter }
        },
        { path: '/:notFound(.*)', component: PageNotFound },
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
        // console.log('Position scrollBehavior')
        // console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    },
});

router.beforeEach(function (to, from, next) {
    console.log('Global beforeEach');
    console.log(to, from);
    // if (to.name === 'team-members') {
    //     next()
    // } else {
    //     next({name: 'team-members', prarams: {teamId: 't2'}})
    // }
    next();
});

router.afterEach(function (to, from) {
    // sending analytic data of navigation
    console.log('Global afterEach');
    console.log(to, from);
});

const app = createApp(App)

app.use(router);

app.mount('#app');
