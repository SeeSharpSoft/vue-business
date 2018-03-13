<template>
	<div class="component calendar">
        <div class="info">  
            <span :title="getFullMonthName(visibleMonth)">{{ getMonthName(visibleMonth) }}</span>
            <span>{{ visibleYear }}</span>
        </div>
        <div class="wrap">
            <ul class="kw headline">
                <li v-for="n in 7" :key="n">{{ getWeekDayName(n) }}</li>
            </ul>
            <ul class="kw" ref="days">
                <li v-for="(day, index) in daysOfVisibleMonth" 
                    class="day" 
                    :key="index"
                    :data-out="!!day.outOfBounds"
                    :data-today="!!day.today"
                    :data-selected="isSelected(day)"
                    @click="selectDate(day)"
                    :tabindex="getTabIndex(day)"
                    @keydown.left="updateFocus(day, index, -1)"
                    @keydown.right="updateFocus(day, index, 1)"
                    @keydown.up="updateFocus(day, index, -7)"
                    @keydown.down="updateFocus(day, index, 7)"
                    @keydown.enter="selectDate(day)"
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
        getMonthName(month) {
            return moment().month(month).format('MMM')
        },

        getFullMonthName(month) {
            return moment().month(month).format('MMMM')
        },

        getWeekDayName(day) {
            return moment().isoWeekday(day).format('dd')
        },

        getTabIndex(day) {
            if (!this.selectedDate) {
                return this._isSameDay(this.today, day.moment) ? "0" : "-1"
            }

            return this._isSameDay(this.selectedDate, day.moment) ? "0" : "-1"
        },

        selectDate(day) {
            this.selectedDate = day.moment

            this.$emit('select', day.moment)
        },

        updateFocus(day, current, delta) {
            if (current % 7 === 0) {
               if (delta === -1) {
                   return this._setMonth(day, -1)
               }
            }

            if ((current - 6) % 7 === 0 && current !== 0) {
               if (delta === 1) {
                   return this._setMonth(day, 1)
               }
            }

            this.setFocus(current + delta)
        },

        setFocus(index) {
            if (index < 0) {
                index = 0
            }

            if (index >= this.$refs.days.children.length) {
                index = this.$refs.days.children - 1
            }

            if (this.$refs.days.children[index]) {
                this.$refs.days.children[index].focus()
            }
        },

        isSelected(day) {
            if (!this.selectedDate) {
                return false
            }

            return this._isSameDay(this.selectedDate, day.moment)
        },

        _setMonth(day, delta) {
            var next = moment(day.moment).add('month', delta)

            this.visibleYear = next.year()
            this.visibleMonth = next.month()
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

            // this is the 6th row. when sunday is the first of a month a sixth row is needed.
            // therefore it is always added to ensure there is no resizing
            // TODO: Missing edge case: Feb. 2010 month with only 28 days - find better solution here!
            if (aDays.length === 5 * 7) {
                for (var i = 7 - endWeekDay + 1; i <= 7 - endWeekDay + 7; i++) {
                    this._addPlaceholder(aDays, moment(current).add('days', i))
                }
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
    width: 7 * @tile-size + 100px;
    display: flex;

    .info {
        width: 100px;
        background-color: @color-today;
        color: contrast(@color-today);
        padding: 15px 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: space-between;
        font-size: 1.5rem;
        flex-direction: column;
    }

    .wrap {
        width: 7 * @tile-size;

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
