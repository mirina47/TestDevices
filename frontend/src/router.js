import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListDevices from "./components/ListDevices.vue";

// определяем маршруты
const routes = [
    {
        path: "/", // указание маршрута, по которому будем переходить к списку устройств
        name: "devices", // имя маршрута
        alias: "/listDevices", // указание дополнительного маршрута
        component: ListDevices, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список устройств"
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;