<template>
	<div class="component calendar">
        <div class="wrap">
            <ul class="kw headline">
                <li v-for="n in 7" :key="n">{{ getWeekDayName(n) }}</li>
            </ul>
            <ul class="kw">
                <li v-for="(day, index) in daysOfVisibleMonth" 
                    class="day" 
                    :key="index"
                    :data-out="!!day.outOfBounds"
                    :data-today="!!day.today"
                    :data-selected="!!day.selected"
                    @click="selectDate(day)"
                >{{ day.moment.date() }}</li>
            </ul>
        </div>
	</div>
</template>

<script>
import VibeComponent from '@/vibe/mixins/VibeComponent'

export default {
    name: 'VibeCalendar',
    mixins: [VibeComponent],
    props: ["selected"],
    data() {
        return {
            today: moment(),
            visibleYear: null,
            visibleMonth: null,
            selectedDate: null
        }
    },

    created() {
        this.visibleYear = this.today.year()
        this.visibleMonth = this.today.month()

        if (this.selected) {
            this.selectedDate = this.selected;
        }
    },

    methods: {
        getWeekDayName(day) {
            return moment().isoWeekday(day).format('dd')
        },

        selectDate(day) {
            this.selectedDate = day.moment
        },

        _addPlaceholder(aDays, oMoment) {
            aDays.push({
                outOfBounds: true,
                moment: oMoment
            })
        }
    },

    computed: {
        firstDayOfVisibleMonth() {
            return moment([this.visibleYear, this.visibleMonth])
        },

        lastDayOfVisibleMonth() {
            return moment(this.firstDayOfVisibleMonth).endOf('month')
        },

        daysOfVisibleMonth() {
            var aDays = []

            var current = moment(this.firstDayOfVisibleMonth)
            var startWeekDay = current.day() === 0 ? 7 : current.day()

            for (var i = startWeekDay - 1; i > 0; i--) {
                this._addPlaceholder(aDays, moment(current).subtract('days', i))
            }

            // do not calc days difference. Might lead to problem with summertime
            while (this.lastDayOfVisibleMonth.diff(current, 'hours') >= 12) {
                aDays.push({
                    moment: current,
                    today: current.diff(this.today, 'hours') > -24 && current.diff(this.today, 'hours') < 0
                })

                current = moment(current).add('day', 1)
            }

            // last change is not pushed
            current = moment(current).subtract('day', 1)

            var endWeekDay = current.day() === 0 ? 7 : current.day()

            for (var i = 1; i <= 7 - endWeekDay; i++) {
                this._addPlaceholder(aDays, moment(current).add('days', i))
            }

            if (this.selectedDate) {
                aDays.forEach((day) => {
                    if (day.moment.diff(this.selectedDate, 'hours') < 24 && day.moment.diff(this.selectedDate, 'hours') > 0) {
                        day.selected = true
                    }
                })
            }

            return aDays
        }
    }
}
</script>

<style lang="less">

.calendar {
    width: 350px;
}

.kw.headline {
    font-size: 0.75rem;
}

ul {
    display: block;
    margin: 0;
    padding: 0;
    width: 350px;
}
li {
    display: inline-block;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    line-height: 50px;

    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }

    &[data-today] {
        background-color: tomato;
    }

    &[data-out] {
        opacity: 0.75;
        background-color: #eee;
    }

    &[data-selected] {
        background-color: green;
    }
}
</style>
