# archer-vue-calendar
a vue calendar component for qingcheng mobile projects.


# Usage

```JavaScript
<calendar :show.sync="show" :current-date.sync="currentDate"></calendar>
```

## config params

:week-txt {Array}  default ['日','一','二','三','四','五','六']

:current-day-txt {String} default '今日'

```JavaScript
<calendar :show.sync="show" :current-date.sync="currentDate" :week-txt="['sun','mon','tue','wed','thu','fri','sat']"></calendar>
```

## Change log
* v2.0.0 support vue 2.3+ for .sync  
