<template>
    <div class="m-calendarWrap" v-show="show" transition="fade" v-on:click="hideCalendar()">
        <div class="m-calendar" v-on:click="stopPop($event)">
            <div class="monthWrap">
                <div class="arrowWrap" v-on:click="changeMonth($event, -1)">
                    <i class="arrow arrow-left"></i>
                </div>
                <p>{{ currentDateTxt }}</p>
                <div class="arrowWrap arrowWrap-right" v-on:click="changeMonth($event, 1)">
                    <i class="arrow"></i>
                </div>
            </div>
            <table class="calendarTable">
                <thead class="headerWrap">
                <tr>
                    <th :class="{'z-weekend': $index ==0 || $index == 6}" v-for="text in weekTxt">{{text}}</th>
                </tr>
                </thead>
                <tbody class="calendarWrap">
                <tr v-for="week in weeks">
                    <td :class="{'z-disabled': day.disabled, 'z-active': day.selected}" v-for="day in week"
                        v-on:click="selectDay($event, day)">
                        <span v-if="!day.isToday">{{day.dateTxt}}</span>
                        <span v-if="day.isToday">{{currentDayTxt}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<style lang="less">
    @import "calendar.less";
</style>

<script>
    import moment from 'moment';

    export default{
        data(){
            return {
                weeks: null,
                currentDateTxt: ''
            }
        },
        created () {
            this.weeks = this.manageDate(this.currentDate);
            this.currentDateTxt = moment(this.currentDate).format('YYYY年MM月');
        },
        props: {
            currentDate: {
                required: true,
                twoWay: true,
                default: () => new Date()
            },
            show: {
                required: true,
                twoWay: true
            },
            weekTxt: {
                type: Array,
                default: () => ['日','一','二','三','四','五','六']
            },
            currentDayTxt: {
                type: String,
                default: () => '今天'
            }
        },
        methods: {
            hideCalendar () {
                this.show = !1;
            },
            stopPop ($event){
                $event.stopPropagation();
            },
            changeMonth ($event, offset){
                var _date = moment(this.currentDate);
                _date.month(_date.month() + offset);
                this.currentDate = _date.format('YYYY-MM-DD')
            },
            selectDay ($event, day) {
                this.currentDate = moment(day.date).format('YYYY-MM-DD');
                this.show = !1;
            },
            manageDate (date) {
                var getDaysInMonth = function (year, month) {
                    return [31, ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
                };

                //判断日期是否是同一天
                var datesAreEqual = function (d1, d2) {
                    return d1 && d2 && (d1.getYear() === d2.getYear()) && (d1.getMonth() === d2.getMonth()) && (d1.getDate() === d2.getDate());
                };

                var formatDate = function (date) {
                    var _type = typeof date,
                            _dateItems;

                    if (_type == 'object') {
                        return new Date(date);
                    } else if (_type == 'string') {
                        _dateItems = date.split('-');
                        return new Date(_dateItems[0], _dateItems[1] - 1, _dateItems[2]);
                    }
                };

                //初始化日历数据
                var setupCalendarView = function (calendarDate, today) {
                    var curDate, d, data, day, daysInMonth, disabled, numRows, offset, row, today, weeks, _i, _j, _ref;
                    offset = calendarDate.getDay(); //当前是月中的第几天
                    daysInMonth = getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth());//当月有多少天
                    numRows = Math.ceil((offset + daysInMonth) / 7); //日历的行数
                    weeks = [];
                    today = formatDate(today);
                    curDate = formatDate(calendarDate);
                    curDate.setDate(curDate.getDate() + (offset * -1));

                    var _currentDate = new Date();

                    for (row = _i = 0, _ref = numRows - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
                        weeks.push([]);
                        for (day = _j = 0; _j <= 6; day = ++_j) {
                            d = formatDate(curDate);
                            data = {};
                            disabled = !(d.getMonth() == calendarDate.getMonth());

                            data.date = d;
                            data.dateTxt = moment(d).format('D');
                            data.disabled = disabled;
                            data.data = [];
                            if (datesAreEqual(d, today)) {
                                data.selected = true;
                            }

                            if (datesAreEqual(d, _currentDate)) {
                                data.isToday = !0;
                            }


                            weeks[row].push(data);
                            curDate.setDate(curDate.getDate() + 1);
                        }
                    }
                    return weeks;
                };

                var manageDate = function (_date) {
                    var calendarDate = formatDate(_date);
                    calendarDate.setDate(1);
                    return setupCalendarView(calendarDate, formatDate(_date));
                };

                return manageDate(date);
            }
        },
        watch: {
            currentDate (val) {
                this.weeks = this.manageDate(this.currentDate);
                this.currentDateTxt = moment(this.currentDate).format('YYYY年MM月')
            }
        }
    }

</script>
