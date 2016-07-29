import calendar from '../dist/index'

new Vue({
    el: 'body',
    data(){
        return {
            show: 1,
            currentDate: new Date()
        }
    },
    methods: {
        showCalendar (){
            this.show = !0;
        }
    },
    components: {
        calendar : calendar
    }
})