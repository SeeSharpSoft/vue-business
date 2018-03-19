<template>
	<div class="component calendar vibe-calendar">
        <div class="info">  
            <vibe-icon icon="313-arrow-left"></vibe-icon>
            <div class="month year">
                <span :title="getFullMonthName(visibleMonth)">{{ getMonthName(visibleMonth) }}</span>
                <span>{{ visibleYear }}</span>
            </div>
            <vibe-icon icon="309-arrow-right"></vibe-icon>
        </div>
        <div class="wrap">
            <ul class="kw headline">
                <li v-for="n in 7" :key="n">{{ getWeekDayName(n) }}</li>
            </ul>
            <ul class="kw" ref="days">
                <li v-for="(day, index) in daysOfVisibleMonth" 
                    class="day" 
                    :key="index"
                    :data-out="day.month() !== visibleMonth"
                    :data-today="day.isSame(today, 'day')"
                    :data-selected="day.isSame(selectedDate, 'day')"
                    @click="selectDate(day)"
                    :tabindex="getTabIndex(day)"
                    @keydown.left="updateFocus(day, index, -1)"
                    @keydown.right="updateFocus(day, index, 1)"
                    @keydown.up="updateFocus(day, index, -7)"
                    @keydown.down="updateFocus(day, index, 7)"
                    @keydown.enter="selectDate(day)"
                >{{ day.date() }}</li>
            </ul>
        </div>
	</div>
</template>

<script>

import VibeComponent from '@/vibe/mixins/VibeComponent'
import VibeIcon from './VibeIcon'
import Editable from '../mixins/Editable.js'

export default {
    name: 'VibeCalendar',
    extends: VibeComponent,
    mixins: [Editable],
    props: ["selected"],
    data() {
        return {
            today: moment(),
            visibleDate: null,
            selectedDate: null
        }
    },

    watch: {
        selectedDate(oldValue, newValue) {
            this.onValueChanged('selectedDate', oldValue, newValue)
        }
    },

    created() {
        this.visibleDate = moment([this.today.year(), this.today.month()])
        if (this.selected) {
            this.selectedDate = moment(this.selected)
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
            return day.isSame(this.selectedDate || this.today, 'day') ? "0" : "-1"
        },

        selectDate(day) {
            this.$emit('select', day)
            this.selectedDate = moment(day)
        },

        updateFocus(day, current, delta) {
            if (current % 7 === 0) {
               if (delta === -1) {
                   this.visibleDate = moment(this.visibleDate.subtract(1, 'months'))
                   return
               }
            }

            if ((current - 6) % 7 === 0 && current !== 0) {
               if (delta === 1) {
                   this.visibleDate = moment(this.visibleDate.add(1, 'months'))
                   return
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
        }
    },

    computed: {
        visibleYear() {
            return this.visibleDate.year()
        },

        visibleMonth() {
            return this.visibleDate.month()
        },

        daysOfVisibleMonth() {
            var aDays = []

            let lastDayOfVisibleMonth = moment(this.visibleDate).endOf('month'),
                start = 1 - this.visibleDate.day() % 7 - (this.visibleDate.day() === 0 ? 7 : 0),
                end = lastDayOfVisibleMonth.date() - lastDayOfVisibleMonth.day() % 7 + (lastDayOfVisibleMonth.day() === 0 ? 0 : 7)

            for (var i = start; i < end; i++) {
                aDays.push(moment(this.visibleDate).add(i, 'days'))
            }

            return aDays
        }
    },

    components: {
        VibeIcon
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

.vibe-calendar {
    width: 7 * @tile-size;
    height: 7 * @tile-size + 100px;
    display: flex;
    flex-direction: column;

    .info {
        width: 100%;
        background-color: @color-today;
        color: contrast(@color-today);
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        flex-direction: row;

        .vibe-icon {
            height: 1em;
            width: 1em;
            fill: contrast(@color-today);
        }
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
