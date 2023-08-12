var endYear = 2099;
var endMonth = 11;
var nowDate = new Date();
var displayYear1 = nowDate.getFullYear();
var displayMonth1 = nowDate.getMonth();
var displayMonth2 = displayMonth1 == 11 ? 0 : displayMonth1 + 1;
var displayYear2 = displayMonth1 == 11 ? displayYear1 + 1 : displayYear1;
var monthNames = ['be_jan', 'be_feb', 'be_mar', 'be_apr', 'be_may', 'be_jun', 'be_jul', 'be_aug', 'be_sep', 'be_oct', 'be_nov', 'be_dec'];
var weeks = ["be_sun", "be_mon", "be_tue", "be_wed", "be_thr", "be_fri", "be_sat"];

var currYear = displayYear1;
var currMonth = displayMonth1;
var IsSelect = false;
var GetHotelAvailability;
var maxDate = 90;
$(function () {
    //向前一个月
    $("#datePre").click(function () {
        var sign = $(this).attr("sign");
        if (sign == undefined || sign == null) {
            sign = "-";
        }
        var setAvailable = $(this).attr("setAvailable") == "true";
        if (!(currMonth == nowDate.getMonth() && currYear == nowDate.getFullYear())) {
            displayYear1 = currMonth == 0 ? currYear - 1 : currYear;
            displayMonth1 = currMonth == 0 ? 11 : currMonth - 1;
            displayMonth2 = displayMonth1 == 11 ? 0 : displayMonth1 + 1;
            displayYear2 = displayMonth1 == 11 ? displayYear1 + 1 : displayYear1;
            currMonth = displayMonth1;
            currYear = displayYear1;
            displayDate(displayYear1, displayYear2, displayMonth1, displayMonth2, sign, setAvailable);
        }
    });
    //向后一个月
    $("#dateNext").click(function () {
        var sign = $(this).attr("sign");
        if (sign == undefined || sign == null) {
            sign = "-";
        }
        var setAvailable = $(this).attr("setAvailable") == "true";
        if (!(currMonth + 1 == endMonth && currYear == endYear)) {
            displayYear1 = currMonth == 11 ? currYear + 1 : currYear;
            displayMonth1 = currMonth == 11 ? 0 : currMonth + 1;
            displayMonth2 = displayMonth1 == 11 ? 0 : displayMonth1 + 1;
            displayYear2 = displayMonth1 == 11 ? displayYear1 + 1 : displayYear2;
            currMonth = displayMonth1;
            currYear = displayYear1;
            displayDate(displayYear1, displayYear2, displayMonth1, displayMonth2, sign, setAvailable);
        }
    });
});
//设置check_in和check_out显示值
function Date_init(sign, setDatePicker, setAvailable) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    if (typeof setDatePicker == 'undefined') {
        setDatePicker = true;
    }
    if (typeof setAvailable == 'undefined') {
        setAvailable = false;
    }
    if (check_in != "" && check_out != "") {
        check_in = dateFormatVal(check_in, sign);
        check_out = dateFormatVal(check_out, sign);
        var ctime = dateFormatVal(nowDate.getFullYear() + sign + (parseInt(nowDate.getMonth()) + 1) + sign + nowDate.getDate(), sign);
        if (compareDateTime(ctime, check_in, sign) >= 0) {
            check_in = ctime;
        }
        //时间区间限制
        var ins = changeDate(check_in, sign);
        var outs = changeDate(check_out, sign);
        if (ins.getFullYear() < nowDate.getFullYear()) {
            check_in = dateFormatStr(nowDate, sign);
        }
        else {
            if (ins.getFullYear() == nowDate.getFullYear() && ins.getMonth() < nowDate.getMonth) {
                check_in = dateFormatStr(nowDate, sign);
            }
            if (ins.getFullYear() > endYear) {
                check_in = endYear + sign + endMonth + sign + "01";
            }
            else {
                if (ins.getFullYear() == endYear && ins.getMonth() > endMonth) {
                    check_in = endYear + sign + endMonth + sign + "01";
                }
            }
        }
        if (outs.getFullYear() > endYear) {
            check_out = endYear + sign + "12" + sign + "31";
        }

        //入住日期大于离开日期时，把离开日期设为入住日期的下一天
        if (!comperDate(check_in, check_out)) {
            check_out = addDays(check_in, 1, sign);
        }
        var dayNum = 91;
        if (setDatePicker) {
            dayNum = 91;
        }
        else {
            dayNum = maxDate;
        }
        if (compareDateTime(check_out, check_in, sign) > dayNum) {
            check_out = addDays(check_in, dayNum, sign);
        }
        var cin = changeDate(check_in, sign);
        var cout = changeDate(check_out, sign);
        displayYear1 = cin.getFullYear();
        displayMonth1 = cin.getMonth();
        displayMonth2 = displayMonth1 == 11 ? 0 : displayMonth1 + 1;
        displayYear2 = displayMonth1 == 11 ? displayYear1 + 1 : displayYear1;
        currYear = changeDate(check_in, sign).getFullYear();
        currMonth = changeDate(check_in, sign).getMonth();
    }
    if (setDatePicker) {
        $("#check_in").val(check_in);
        $("#check_out").val(check_out);
    }
    else {
        //yyyy/mm/dd->mm/dd/yyyy
        $("#check_in").val(dateToMMDDYY(check_in, sign));
        $("#check_out").val(dateToMMDDYY(check_out, sign));
        $("#reservationNumNights").val(parseInt(compareDateTime(check_out, check_in, sign), 10));
    }
    if (setDatePicker) {
        if ($.event._dpCache != null && $.event._dpCache != undefined) {
            $.event._dpCache[$("#check_in")[0]._dpId].setSelected(changeDate(check_in, sign), true, true);
            $.event._dpCache[$("#check_out")[0]._dpId].setSelected(changeDate(check_out, sign), true, true);
        }
        else {
            $('.date-pick').datePicker({createButton: false, selectMultiple: false});
            $('.date-pick').keydown(function () {
                return false;
            });
        }
    }
    else {
        $("#check_in").datepicker('setDate', dateToMMDDYY(check_in, sign));
        var maxDate = changeDate(addDays(check_in, maxDate, sign), sign);
        $("#check_out").datepicker("option", "maxDate", maxDate);
        $("#check_out").datepicker('setDate', dateToMMDDYY(check_out, sign));
    }
    displayDate(displayYear1, displayYear2, displayMonth1, displayMonth2, sign, setAvailable);
}
function displayDate(displayYear1, displayYear2, displayMonth1, displayMonth2, sign, setAvailable) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    if (typeof setAvailable == 'undefined') {
        setAvailable = false;
    }
    $("#monthName1").html("<span class='localize' key='" + monthNames[displayMonth1] + "'>" + LocalizeKey(lang, monthNames[displayMonth1]) + "</span> " + displayYear1);
    $("#monthName2").html("<span class='localize' key='" + monthNames[displayMonth2] + "'>" + LocalizeKey(lang, monthNames[displayMonth2]) + "</span> " + displayYear2);
    var month1 = $("#month1");
    var month2 = $("#month2");
    $(month1).empty();
    $(month2).empty();
    if (displayMonth1 == nowDate.getMonth() && displayYear1 == nowDate.getFullYear()) {
        $("#datePre").addClass("pre-no-back");
    }
    else {
        $("#datePre").removeClass("pre-no-back");
    }
    var newD1 = new Date(displayYear1, displayMonth1, 1);
    var nullCount1 = newD1.getDay();
    for (var i = 0; i < nullCount1; i++) {
        var d = $("<li class='no'></li>");
        month1.append(d);
    }
    var newD2 = new Date(displayYear2, displayMonth2, 1);
    var nullCount2 = newD2.getDay();
    for (var i = 0; i < nullCount2; i++) {
        var d = $("<li  class='no'></li>");
        month2.append(d);
    }
    for (var i = 0; i < Days(displayYear1, displayMonth1); i++) {
        var d = $("<li>" + parseInt(i + 1) + "</li>");
        var curDate = Date.parse((displayYear1 + "-" + parseInt(displayMonth1 + 1) + "-" + parseInt(i + 1)).replace(/-/g, "/"));
        if (check_in != "" && check_out != "" && comperDate(check_in, check_out)) {
            if (curDate >= Date.parse(check_in.replace(/-/g, "/")) && curDate <= Date.parse(check_out.replace(/-/g, "/"))) {
                d.addClass("select");
            }
        }
        if (curDate >= Date.parse(dateFormatStr(nowDate).replace(/-/g, "/"))) {
            d.addClass("inforce");
        }
        else {
            d.addClass("no");
        }
        d.attr('dateVal', dateFormatVal(displayYear1 + "/" + parseInt(displayMonth1 + 1) + "/" + parseInt(i + 1), "/"));
        month1.append(d);
    }
    for (var i = 0; i < Days(displayYear2, displayMonth2); i++) {
        var d = $("<li>" + parseInt(i + 1) + "</li>");
        var curDate = Date.parse((displayYear2 + "-" + parseInt(displayMonth2 + 1) + "-" + parseInt(i + 1)).replace(/-/g, "/"));
        if (check_in != "" && check_out != "" && comperDate(check_in, check_out)) {
            if (curDate >= Date.parse(check_in.replace(/-/g, "/")) && curDate <= Date.parse(check_out.replace(/-/g, "/"))) {
                d.addClass("select");
            }
        }
        if (curDate >= Date.parse(dateFormatStr(nowDate).replace(/-/g, "/"))) {
            d.addClass("inforce");
        }
        else {
            d.addClass("no");
        }
        d.attr('dateVal', dateFormatVal(displayYear2 + "/" + parseInt(displayMonth2 + 1) + "/" + parseInt(i + 1), "/"));
        month2.append(d);
    }
    if (setAvailable) {
        var startDate = new Date(displayYear1, displayMonth1, 1);
        var endDate = new Date(displayYear2, displayMonth2 + 1, 0);
        if ($.isFunction(GetHotelAvailability)) {
            GetHotelAvailability(startDate, endDate, function (data) {
                if (data.hotelAvailabilities != undefined) {
                    var showDate = startDate;
                    $.each(data.hotelAvailabilities, function (index, value) {
                        var tempDateString = dateFormatStr(showDate, "/");
                        if (value == false) {
                            $("#datePannel li[dateVal='" + tempDateString + "']").addClass("notAvailable");
                        }
                        showDate.setDate(showDate.getDate() + 1);
                    });
                }
            });
        }
    }
    dayClick(sign);
}
function dayClick(sign) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    $("#datePannel dl dd ul li.inforce").click(function () {
        if (IsAjaxLock) return;
        var setDatePicker = $("#datePannel").attr("setDatePicker");
        if (setDatePicker != "false") {
            setDatePicker = true;
        }
        else {
            setDatePicker = false;
        }
        var year = "";
        var month = "";
        var curPannel = "month1";
        if ($(this).parent().attr("id") == "month1") {
            year = displayYear1;
            month = displayMonth1;
            curPannel = "month1";
        }
        else {
            year = displayYear2;
            month = displayMonth2;
            curPannel = "month2";
        }
        var thisdays = Days(year, month);
        if (!IsSelect) {
            $("#datePannel dl dd ul li").removeClass("select");
            if (parseInt($(this).text()) == thisdays) {
                if (curPannel == "month2") {
                    $(this).addClass("select");
                    check_in = dateFormatVal(year + sign + (parseInt(month) + 1) + sign + $(this).text(), sign);
                    var nm = month == 11 ? 0 : month + 1;
                    var ny = month == 11 ? year + 1 : year;
                    check_out = dateFormatVal(ny + sign + (parseInt(nm) + 1) + sign + "01", sign);
                }
                else {
                    $(this).addClass("select");
                    check_in = dateFormatVal(year + sign + (parseInt(month) + 1) + sign + $(this).text(), sign);
                    check_out = dateFormatVal(displayYear2 + sign + (parseInt(displayMonth2) + 1) + sign + $("#datePannel dl dd ul[id='month2'] li.inforce:first").text(), sign);
                    $("#datePannel dl dd ul[id='month2'] li.inforce:first").addClass("select");

                }
            }
            else {
                $(this).addClass("select");
                $(this).next("li.inforce").addClass("select");
                check_in = dateFormatVal(year + sign + (parseInt(month) + 1) + sign + $(this).text(), sign);
                check_out = dateFormatVal(year + sign + (parseInt(month) + 1) + sign + (parseInt($(this).text()) + 1), sign);
            }
            setFirstInOut(setDatePicker);
        }
        else {
            var newDate = dateFormatVal(year + sign + (parseInt(month) + 1) + sign + $(this).text(), sign);
            setNextInOut(newDate, sign, setDatePicker);
        }
        if (setDatePicker) {
            if ($.event._dpCache != null && $.event._dpCache != undefined) {
                $.event._dpCache[$("#check_in")[0]._dpId].setSelected(changeDate(check_in, sign), true, true);
                $.event._dpCache[$("#check_out")[0]._dpId].setSelected(changeDate(check_out, sign), true, true);
            }
            else {
                $('.date-pick').datePicker({createButton: false, selectMultiple: false});
                $('.date-pick').keydown(function () {
                    return false;
                });
            }
        }
        else {
            $("#check_in").datepicker('setDate', dateToMMDDYY(check_in, "/"));
            var maxDate = changeDate(addDays(check_in, maxDate, "/"), "/");
            $("#check_out").datepicker("option", "maxDate", maxDate);
            $("#check_out").datepicker('setDate', dateToMMDDYY(check_out, "/"));
        }
        isprocodeclick = false;
        if (setDatePicker) {
            search();
        }
    });
}
//第一次 点击后设置显示
function setFirstInOut(defaultType) {
    if (typeof defaultType == 'undefined') {
        defaultType = true;
    }
    if (defaultType) {
        $("#check_in").val(check_in);
        $("#check_out").val(check_out);
    }

    else {
        //yyyy/mm/dd->mm/dd/yyyy
        $("#check_in").val(dateToMMDDYY(check_in, "/"));
        $("#check_out").val(dateToMMDDYY(check_out, "/"));
        $("#reservationNumNights").val(parseInt(compareDateTime(check_out, check_in, "/"), 10));
    }
    IsSelect = true;
}
function setNextInOut(newDate, sign, defaultType) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    if (typeof defaultType == 'undefined') {
        defaultType = true;
    }
    $("#datePannel dl dd ul li").removeClass("select");
    var nD = Date.parse(newDate.replace(/-/g, "/"));
    var startD = Date.parse(check_in.replace(/-/g, "/"));
    var endD = Date.parse(check_out.replace(/-/g, "/"));
    if (nD >= endD) {
        check_out = newDate;
    }
    if (nD < startD) {
        check_in = newDate;
        check_out = addDays(check_out, -1, sign);
    }
    var dayNum = 91;
    if (defaultType) {
        dayNum = 91;
    }
    else {
        dayNum = maxDate;
    }
    if (compareDateTime(check_out, check_in, sign) > dayNum) {
        check_out = addDays(check_in, dayNum, sign);
    }
    if (defaultType) {
        $("#check_in").val(check_in);
        $("#check_out").val(check_out);
    }
    else {
        //yyyy/mm/dd->mm/dd/yyyy
        $("#check_in").val(dateToMMDDYY(check_in, "/"));
        $("#check_out").val(dateToMMDDYY(check_out, "/"));
        $("#reservationNumNights").val(parseInt(compareDateTime(check_out, check_in, "/"), 10));
    }
    var newcheck_in = Date.parse(check_in.replace(/-/g, "/"));
    var newcheck_out = Date.parse(check_out.replace(/-/g, "/"));

    var showStart = $("#datePannel dl dd ul[id='month1'] li.inforce").first().attr("dateval");
    var showStartDate = Date.parse(showStart, "/");
    if (newcheck_out < showStartDate) {
        var monthStartDate = changeDate(check_out, sign);
        var monthVal = monthStartDate.getMonth();
        var yearVal = monthStartDate.getFullYear();
        displayYear1 = monthVal == 0 ? yearVal - 1 : yearVal;
        displayYear2 = yearVal;
        displayMonth1 = monthVal == 0 ? 11 : monthVal - 1;
        displayMonth2 = monthVal;
        currMonth = displayMonth1;
        currYear = displayYear1;
        var setAvailable = $("#dateNext").attr("setAvailable");
        if (setAvailable == "true") {
            setAvailable = true;
        }
        else {
            setAvailable = false;
        }
        displayDate(displayYear1, displayYear2, displayMonth1, displayMonth2, sign, setAvailable);
    }
    else {
        $("#datePannel dl dd ul[id='month1'] li.inforce").each(function () {
            var ny = displayYear1;
            var nm = displayMonth1;
            var nd = $(this).text();
            var p = Date.parse(dateFormatVal(ny + sign + (parseInt(nm) + 1) + sign + nd, sign).replace(/-/g, "/"));
            if (p >= newcheck_in && p <= newcheck_out) {
                $(this).addClass("select");
            }
        });
        $("#datePannel dl dd ul[id='month2'] li.inforce").each(function () {
            var ny = displayYear2;
            var nm = displayMonth2;
            var nd = $(this).text();
            var p = Date.parse(dateFormatVal(ny + sign + (parseInt(nm) + 1) + sign + nd, sign).replace(/-/g, "/"));
            if (p >= newcheck_in && p <= newcheck_out) {
                $(this).addClass("select");
            }
        });
    }
    IsSelect = false;
}
function Days(y, m) {
    var date = new Date(y, m + 1, 0)
    return date.getDate();
}

function dateFormatVal(datetime, sign) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    var times = datetime.split(sign);
    var y = times[0];
    var m = times[1];
    var d = times[2];
    var da = d.toString().length < 2 ? "0" + d : d;
    var mon = m.toString().length < 2 ? "0" + m : m;
    return y + sign + mon + sign + da;
}
function dateFormatStr(datetime, sign) {
    var m = datetime.getMonth() + 1;
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    return dateFormatVal(datetime.getFullYear() + sign + m + sign + datetime.getDate(), sign);
}
function dateToMMDDYY(datetime, sign) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    var times = datetime.split(sign);
    var y = times[0];
    var m = times[1];
    var d = times[2];
    var da = d.toString().length < 2 ? "0" + d : d;
    var mon = m.toString().length < 2 ? "0" + m : m;
    return da + sign + mon + sign + y;
}
function dateToYYMMDD(datetime, sign) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    var times = datetime.split(sign);
    var m = times[0];
    var d = times[1];
    var y = times[2];
    var da = d.toString().length < 2 ? "0" + d : d;
    var mon = m.toString().length < 2 ? "0" + m : m;
    return y + sign + mon + sign + da;
}
function comperDate(time1, time2) {
    var d1 = Date.parse(time1.replace(/-/g, "/"));
    var d2 = Date.parse(time2.replace(/-/g, "/"));
    if (d1 != "" && d2 != "" && d1 < d2)
        return true;
    else
        return false;
}

//得到两日期天数差
function compareDateTime(first, second, sign) {
    fArray = first.split(sign);
    sArray = second.split(sign);
    var fDate = Date.UTC(fArray[0], fArray[1] - 1, fArray[2], 0, 0, 0);
    var sDate = Date.UTC(sArray[0], sArray[1] - 1, sArray[2], 0, 0, 0);
    var days = (fDate - sDate) / (1000 * 60 * 60 * 24);
    return days;
}

function getmd(d) {
    var md = d.split('-');
    return md[1] + "-" + md[2];
}

function addDays(orgDate, AddD, sign) {
    var newDateTime;
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    newDateTime = changeDate(orgDate, sign);
    newDateTime.setDate(newDateTime.getDate() + AddD);
    var newMonth = newDateTime.getMonth() + 1 == 13 ? 1 : parseInt(newDateTime.getMonth() + 1);
    if (newMonth.toString().length < 2)
        newMonth = "0" + newMonth;
    var newDate = newDateTime.getDate();
    if (newDate.toString().length < 2)
        newDate = "0" + newDate;
    return newDateTime.getFullYear() + sign + newMonth + sign + newDate;
}
//获取两日期之间的所有日期数组
function DateArr(s, e, sign) {
    if (typeof sign == 'undefined') {
        sign = "-";
    }
    var Dates = new Array();
    var ns = changeDate(s, sign);
    var ne = changeDate(e, sign);
    Dates.push(ns);
    var days = compareDateTime(e, s, sign);
    for (var i = 1; i <= days; i++) {
        var nd = changeDate(addDays(s, i, sign), sign);
        Dates.push(nd);
    }
    Dates.push(ne);
    return Dates;
}
//把字符串转换为日期对象
function changeDate(dt, sign) {
    fArray = dt.split(sign);
    return fDate = new Date(fArray[0], fArray[1] - 1, fArray[2]);
}