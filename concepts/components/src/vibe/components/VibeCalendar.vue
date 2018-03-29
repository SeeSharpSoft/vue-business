<template>
	<div class="component calendar vibe-calendar">
        <!-- toolbar -->
        <div class="info">  
            <vibe-icon icon="arrow-left" 
                       @click.native="pageCal(-1)"
                       @keydown.enter.native="pageCal(-1)"
                       tabindex="0"
            ></vibe-icon>
            
            <div class="month year">
                <!-- month -->
                <span :title="getFullMonthName(visibleMonth)"
                      @click="changeMode(modes.month)"
                      @keydown.enter="changeMode(modes.month, true)"
                      tabindex="0"
                >{{ getMonthName(visibleMonth) }}</span>

                <!-- year -->
                <span @click="changeMode(modes.year)"
                      @keydown.enter="changeMode(modes.year, true)"
                      tabindex="0"
                >{{ visibleYear }}</span>
            </div>

            <vibe-icon icon="arrow-right" 
                       @click.native="pageCal(1)"
                       @keydown.enter.native="pageCal(1)"
                       tabindex="0"
            ></vibe-icon>
        </div>

        <!-- selection / display of days -->
        <div class="wrap" v-if="!mode">
            <ul class="kw headline">
                <li v-for="n in 7" :key="n">{{ getWeekDayName(n) }}</li>
            </ul>
            <ul class="kw" ref="days">
                <li v-for="(day, index) in daysOfVisibleMonth" 
                    class="day" 

                    :key="index"
                    :tabindex="getTabIndex(day)"

                    :data-out="day.month() !== visibleMonth"
                    :data-today="day.isSame(today, 'day')"
                    :data-selected="day.isSame(selectedDate, 'day')"

                    @click="selectDate(day)"
                    @keydown.left="updateFocus(day, index, -1)"
                    @keydown.right="updateFocus(day, index, 1)"
                    @keydown.up="updateFocus(day, index, -7)"
                    @keydown.down="updateFocus(day, index, 7)"
                    @keydown.enter="selectDate(day)"
                >{{ day.date() }}</li>
            </ul>
        </div>
        
        <!-- selection of year -->
        <div class="wrap" v-if="mode && mode === modes.year">
            <ul class="years" ref="years">
                <li v-for="(n, index) in 16" :key="index" tabindex="-1">
                    <span @click="setYear(selectedYear + n)">{{ selectedYear + n }}</span>
                </li>
            </ul>
        </div>

        <!-- selection of month -->
        <div class="wrap" v-if="mode && mode === modes.month">
            <ul class="months" ref="months">
                <li v-for="(month, index) in months" :key="index" tabindex="-1">
                    <span @click="setMonth(index)" >{{ month }}</span>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>

import VibeComponent from './VibeComponent'
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
            selectedDate: null,
            mode: null,
            modes: {
                year: 'year',
                month: 'month'
            },
            months: moment.monthsShort(),
            selectedYear: null
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

        this.selectedYear = this.visibleDate.year()
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

        pageCal(amount) {
            switch (this.mode) {
                case this.modes.year:
                    this.selectedYear += 16 * amount
                    break;
                case this.modes.month:
                    this.visibleDate = moment(this.visibleDate.add(amount, 'years'))
                    break;
                default:
                    this.visibleDate = moment(this.visibleDate.add(amount, 'months'))
                    break;
            }
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
        },

        setMonth(month) {
            this.visibleDate = moment(this.visibleDate.month(month))
            this.mode = null
        },

        setYear(year) {
            this.visibleDate = moment(this.visibleDate.year(year))
            this.mode = null
        },

        changeMode(selectedMode, focus) {
            this.mode !== selectedMode ? this.mode = selectedMode : this.mode = null

            if (focus) {
                // ensure this is called after the change of the mode was calculated
                setTimeout(function() {
                    switch (this.mode) {
                        case this.modes.month:
                            this.$refs.months.children[0].focus()
                            break
                        case this.modes.year:
                            this.$refs.years.children[0].focus()
                            break
                        default:
                            break
                    }
                }.bind(this), 0)
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
    text-align: center;

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
        user-select: none;

        .month.year > span {
            cursor: pointer;
        }

        .vibe-icon {
            height: 1em;
            width: 1em;
            fill: contrast(@color-today);
        }
    }

    .wrap {
        width: 7 * @tile-size;

        ul {
            display: block;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        ul.months, ul.years {
            > li {
                display: inline-block;
                box-sizing: border-box;
                width: ~"calc(25% - 4px)";
                text-align: center;
                user-select: none;
                margin: 2px;

                > span {
                    display: block;
                    padding: 20px 5px;
                    border: 1px solid @color-selected;
                    cursor: pointer;
                    user-select: none;

                    &:hover {
                        background-color: @color-hover;
                    }
                }
            }
        }

        ul.kw {
            &.headline {
                font-size: 0.75rem;
            }

            > li {
                display: inline-block;
                box-sizing: border-box;
                width: @tile-size - 2px;
                height: @tile-size - 2px;
                line-height: @tile-size;
                user-select: none;
                margin: 1px;

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
