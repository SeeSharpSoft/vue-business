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
                    :data-selected="isSelected(day)"
                    @click="selectDate(day)"
                    tabindex="0"
                    @keydown.left="setFocus($event, -1, 0)"
                    @keydown.right="setFocus($event, 1, 0)"
                    @keydown.up="setFocus($event, 0, -1)"
                    @keydown.down="setFocus($event, 0, 1)"
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

            this.$emit('select', day.moment)
        },

        setFocus(current, x, y) {
            console.log(current)
            if (x < 0) {

            }

            if (x > 0) {

            }

            if (y < 0) {

            }

            if (y > 0) {

            }
        },

        isSelected(day) {
            if (!this.selectedDate) {
                return false
            }

            return this._isSameDay(this.selectedDate, day.moment)
        },

        _addPlaceholder(aDays, oMoment) {
            aDays.push({
                outOfBounds: true,
                moment: oMoment
            })
        },

        _isSameDay(moment1, moment2) {
            return (
                moment1.year() === moment2.year() &&
                moment1.month() === moment2.month() &&
                moment1.date() === moment2.date()
            )
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
            while (!this._isSameDay(current, this.lastDayOfVisibleMonth)) {
                aDays.push({
                    moment: current,
                    today: this._isSameDay(this.today, current)
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

@tile-size: 50px;
@color-default: white;
@color-today: #111;
@color-hover: #ddd;
@color-selected: rgb(116, 116, 116);
@color-outside: #eee;
@color-disabled: #333;

.calendar {
    width: 7 * @tile-size;

    .wrap {
        width: 100%;

        ul.kw {
            &.headline {
                font-size: 0.75rem;
            }

            display: block;
            margin: 0;
            padding: 0;
            width: 100%;

            > li {
                display: inline-block;
                box-sizing: border-box;
                width: @tile-size;
                height: @tile-size;
                line-height: @tile-size;

                cursor: pointer;

                background-color: @color-default;

                &:hover {
                    background-color: @color-hover;
                    color: contrast(@color-hover);
                }

                &[data-today] {
                    background-color: @color-today;
                    color: contrast(@color-today);
                }

                &[data-out] {
                    opacity: 0.75;
                    background-color: @color-outside;
                    color: contrast(@color-outside);
                }

                &[data-selected] {
                    background-color: @color-selected;
                    color: contrast(@color-selected);
                }

                &[data-disabled] {
                    background-color: @color-disabled;
                    color: contrast(@color-disabled);
                    cursor: not-allowed;
                }
            }
        }
    }
}
</style>
