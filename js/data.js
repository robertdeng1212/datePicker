(function(win){
  var datepicker = {};

  datepicker.getMonthData = function(year, month) {
    var ret = [];

    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    var firstDay = new Date(year, month - 1, 1);
    // 获取本月第一天是星期几
    var firstDayWeekDay = firstDay.getDay();
    // 如果是周日
    if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    // 获取上个月的最后一天
    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    // 计算日期第一行显示多少个上个月的日期
    var preMonthDayCount = firstDayWeekDay - 1;

    // 获取当月的最后一天
    var lastDay = new Date(year, month, 0);
    var lastDate = lastDay.getDate();

    // 获取当月的每一天(一个月可能总共会有四五六周)
    for (var i = 0; i < 7 * 6; i++) {
      // 如果1号是周二，那么它前面有一个上月的日期，
      var date = i + 1 - preMonthDayCount;
      // 用来计算应该显示的是哪天
      var showDate = date;
      var thisMonth = month;
      if (date <= 0) {
        // 上一月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) {
        // 下一月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }
      // 上一年的12月
      if (thisMonth === 0) thisMonth = 12;
      // 下一年的1月
      if (thisMonth === 13) thisMonth = 1;

      ret.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }

    return {
      year: year,
      month: month,
      days: ret
    }
  };

  win.datepicker = datepicker;
})(window);