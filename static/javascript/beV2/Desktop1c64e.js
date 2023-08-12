/*--------------------------------------------------
 :: Page-level Functions
 --------------------------------------------------*/
$(document).ready(function () {
    var bImageArr = ["body", ".outer-container", ".ui-content"];
    $.each(bImageArr, function (i, v) {
        checkFixBackgroundImage(v);
    });
    //Link use #
    initialHash = window.location.hash;
    if (initialHash == "") {
        initialHash = window.location.search;
    }
    initLoad(initialHash);
    initMainPage();
    Localize();

    $(".number-input em").unbind("click").click(numberToggleClick);
    $("#accordion").on('mouseenter', '.sectionRow.done, .number-block.done', function () {
        var index;
        if ($(this).hasClass("sectionRow")) index = $(".sectionRow").index($(this));
        else index = $(".number-block").index($(this));
        $(".sectionRow").eq(index).add($(".number-block").eq(index)).addClass("hovered");
    });
    $("#accordion").on('mouseleave', '.sectionRow.done, .number-block.done', function () {
        var index;
        if ($(this).hasClass("sectionRow")) index = $(".sectionRow").index($(this));
        else index = $(".number-block").index($(this));
        $(".sectionRow").eq(index).add($(".number-block").eq(index)).removeClass("hovered");
    });
    setInterval(FullPage, 500);
});

function localizeDatepicker(obj) {
    var dayNamesLocalized = $.map(dayNamesShort, function (n) {
        return LocalizeKey(lang, n);
    });
    var monthNamesLocalized = $.map(monthNamesShort, function (n) {
        return LocalizeKey(lang, n);
    });
    $(obj).datepicker("option", {monthNames: monthNamesLocalized, dayNamesMin: dayNamesLocalized});
}

function localizeNumRoomsSelect() {
    var index = $("#numRooms option").index($("#numRooms").find(":selected"));

    var selectLis = "";
    for (var x = 1; x <= 10; x++) {
        var roomLocalizeName = LocalizeKey(lang, "be_room");
        if (x > 1) {
            roomLocalizeName = LocalizeKey(lang, "be_rooms");
        }
        selectLis += '<option value="' + x + '">' + x + ' ' + roomLocalizeName + '</option>';
    }
    $("#numRooms").html(selectLis);
    $("#numRooms option").eq(index).attr('selected', true).trigger("change");
}

function initMainPage() {
    currSectionIndex = 0;
    var today = new Date();
    var tomorrow = dateAddDays(today, 1);
    var maxCheckout = dateAddDays(today, 90);

    $("#check_in").val($.datepicker.formatDate('dd/mm/yy', today)).datepicker({dateFormat: 'dd/mm/yy', onSelect: dateChange, minDate: today});
    $("#check_out").val($.datepicker.formatDate('dd/mm/yy', tomorrow)).datepicker({dateFormat: 'dd/mm/yy', onSelect: dateChange, minDate: tomorrow, maxDate: maxCheckout});
    localizeDatepicker($("#check_in"));
    localizeDatepicker($("#check_out"));

    $("#reservationNumNights").numeral();
    $("#reservationNumNights").unbind('change').bind('change', checkMaxMin).bind('change', nightsChange);
    $('#check_in,#check_out').keydown(function () {
        return false;
    });
    var sourceDomain = source;
    if (sourceDomain == "") sourceDomain = "london.buuteeq.com";

    /*
     var bookBrandingLink = "/theme/" + hotelid + "/css/web-bookbranding.css";
     $("head").append("<link type='text/css' rel='stylesheet' href='" + apiDomain + bookBrandingLink + "' media='all' />");
     */
    $("#datePre").attr("sign", "/").attr("setAvailable", "true");
    $("#dateNext").attr("sign", "/").attr("setAvailable", "true");
    $("#datePannel").attr("setDatePicker", "false");
    Date_init("/", false, true);

    $("#numRooms").change(function rooms() {
        var arr = $("#roomToggles .room");
        var diff = $(this).val() - arr.length;
        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                var clone = arr.eq(0).clone();
                arr.eq(arr.length - 1).after(clone);
            }
        }
        else if (diff < 0) {
            for (var i = 0; i < Math.abs(diff); i++) {
                arr.eq(arr.length - 1 - i).remove();
            }
        }

        var j = 0;
        $(".room").each(function () {
            $(this).attr("id", "room_" + j++);
        });

        if ($(this).val() > 1) {
            $("#roomToggles").addClass("multi-rooms");
            $("#roomToggles .room").each(function (x) {
                $(this).find("label").html(localizeSpan("be_room") + " " + (x + 1) + ":");

            });
        }
        else $("#roomToggles").removeClass("multi-rooms");
    });

    localizeNumRoomsSelect();
    $("#numRooms option").eq(numrooms - 1).attr('selected', true).trigger("change");

    // Get hotel specific information. This method is commented for now.
    /**
     GetHotelInfo();
     */

    /**
     * This button will have onclick function for now.
     *
     *
     $("#availabilityBtn").click(function () {
        if ($(this).hasClass("disabled-btn"))
            return false;
        $(this).addClass("disabled-btn");
        queryData = {};
        queryData.check_in = $("#check_in").val();
        queryData.check_out = $("#check_out").val();
        queryData.roomsnum = $("#numRooms").val();
        //queryData.numadults = $(".numAdults").val();
        //queryData.numchildren = $(".numChildren").val();
        queryData.promocode = $("#promocode").val();

        queryData.numadults = 0;
        queryData.numchildren = 0;
        queryData.roomsData = $("#roomToggles .room").map(function () {
            var adults = parseFloat($(this).find(".numAdults").val());
            var children = parseFloat($(this).find(".numChildren").val());
            queryData.numadults += adults;
            queryData.numchildren += children;
            return {
                "numadults": adults,
                "numchildren": children
            };
        });

        var currSection = $(".sectionRow").eq(currSectionIndex);
        if (queryData.roomsnum > 1) {
            GetHotelAvailability(stringToDate(queryData.check_in), stringToDate(queryData.check_out), function (data) {
                var checkAvailable = true;
                if (data.hotelAvailabilities != undefined) {
                    $.each(data.hotelAvailabilities, function (index, value) {
                        if (value == false) {
                            checkAvailable = false;
                        }
                    });
                }
                if (checkAvailable) {
                    $(".number-block").eq(currSectionIndex).add(currSection).click(DoneSearchClickPanel);
                    $(".search-error-section").removeClass("show");
                    loadSearchPage();
                }
                else {
                    var errorSection = $(".search-error-section").addClass("show");
                    errorSection.find(".stayErrorMessage").hide();
                    errorSection.find(".message").show();
                    errorSection.find(".contact-info-wrapper").show();
                    var contact = "";
                    if ($("#tel .value").text() != "") {
                        contact = $("#tel .value").text();
                        errorSection.find(".call-label").addClass("center-label").show();
                    }
                    else {
                        contact = $("#email .value").text();
                        errorSection.find(".call-label").hide();
                    }
                    errorSection.find(".contact-info").addClass("center-info").text(contact);
                    errorSection.find(".message span").hide();
                    errorSection.find(".contact-separator").hide();
                    errorSection.find(".avail-chart-btn").hide();
                    $("#availabilityBtn").removeClass("disabled-btn");
                }
            }, queryData.roomsnum);
        }
        else {
            $(".number-block").eq(currSectionIndex).add(currSection).click(DoneSearchClickPanel);
            $(".search-error-section").removeClass("show");
            loadSearchPage();
        }
        return false;
    });
     */
    $(".makeDiv .close").click(function () {
        $(".makeDiv").hide();
        closeMakeDiv();
    });
    $(".termsLink").click(function () {
        OpenReservationPolicy();
        return false;
    });

    // Analytics

}


function editPackages() {
    currSectionIndex = clickedIndex;
    openCurrentSection();
}

function editRoom() {
    currSectionIndex = clickedIndex;
    var currSection = $(".sectionRow").eq(currSectionIndex);
    $(".sectionRow[editFlag]").removeAttr("editFlag");
    currSection.attr("editFlag", "true");
    currSection.add($(".number-block").eq(currSectionIndex)).unbind("click");
    clearRoom($(".room-row").index(currSection), currSection.attr("roomcartid"), openCurrentSection);
}

function clearRoomSection(roomIndex) {
    var roomSection = $(".room-row").eq(roomIndex);
    roomSection.attr("roomcartid", "");
    roomSection.find(".section-screen p").text("");
    roomSection.find(".form-room").removeClass("hide").find(".midmain_inner").html("");
    roomSection.find(".form-addons").html("");
}

function clearRoom(roomIndex, roomCartId, successFn) {
    var successFlag = false;
    if (IsAjaxLock) return successFlag;
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "cartId": cartId,
        "itemId": roomCartId
    };
    var posturl = "/beapi/rest/cart/deleteRoom";

    AjaxPost("post", posturl, postData, function (data) {
        if (data.status == "success") {
            setCart(data);

            clearRoomSection(roomIndex);
            if (successFn) successFn();
            successFlag = true;
        }
        else {
            OpenAddRoomWaring(data.message, function () {
                clearcartData();
                $(".makeDiv").hide();
                closeMakeDiv();
            });
        }
    });
    return successFlag;
}

function deleteRoom() {
    var roomSection = $(".sectionRow").eq(clickedIndex);
    var roomCartId = roomSection.attr("roomcartid"), successFlag = false;
    if (IsAjaxLock) return successFlag;
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "cartId": cartId,
        "itemId": roomCartId
    };
    var posturl = "/beapi/rest/cart/deleteRoom";

    var currSection = $(".sectionRow").eq(currSectionIndex);
    AjaxPost("post", posturl, postData, function (data) {
        if (data.status == "success") {
            setCart(data);

            var index = $(".sectionRow").index(roomSection);
            $(".number-block").eq(index).remove();
            roomSection.remove();
            correctSectionNums();
            currSectionIndex--;

            openCurrentSection();
            successFlag = true;
        }
        else {
            OpenAddRoomWaring(data.message, function () {
                clearcartData();
                $(".makeDiv").hide();
                closeMakeDiv();
            });
        }
    });
    return successFlag;
}

function resetSummaryPageInfo() {
    $(".creditCardInfo input[type=text], .creditCardInfo input[type=tel]").val("");
    $("#ccMonth option").eq(0).text(LocalizeKey(lang, "be_month")).attr('selected', 'selected');
    $("#ccYear option").eq(0).text(LocalizeKey(lang, "be_year")).attr('selected', 'selected');
    $("#acceptTerms").prop('checked', false);
}
function successfulBooking(reservationId) {
    resetSummaryPageInfo();

    $(".results-section-1 .reservation-confirmed-title").html(ThankYouTitle);
    $(".results-section-1 .custom-message").html(ThankYouMessage);

    setReservationTitle($(".results-section-2 .reservation-title"), $("#firstname").val(), $("#lastname").val());
    $(".results-section-2 .codeValue").text(reservationId);
    initResultsPage();
}

function initResultsPage() {
    $(".book-another-btn").click(function () {
        currentCart = cartId = null;
        resetPage();
        GetHotelInfo();  // Get new cartId
        return false;
    });

    $("#accordion").hide();
    $("#results").show();
}

function resetPage() {
    clickedIndex = currSectionIndex = 0;

    if (cartId) clearcartData();

    $("#accordion").show();
    $("#results").hide();
    $(".sectionRow").add(".number-block").removeClass("done").unbind("click");

    $(".room-row").slice(1).remove();
    $(".number-block").slice(2, -1).remove();
    clearRoomSection(0);
    correctSectionNums();

    openCurrentSection();
}

/*--------------------------------------------------
 :: Widget-level Functions
 --------------------------------------------------*/
function dateChange(value, inst) {
    var first = $.datepicker.parseDate('dd/mm/yy', $("#check_in").val());
    var second = $.datepicker.parseDate('dd/mm/yy', $("#check_out").val());
    if (first >= second) {
        if (inst.id == "check_in") {
            second = dateAddDays(first, 1); //nextDay(first);
            $("#check_out").datepicker('setDate', second);
        }
        else {
            first = dateAddDays(second, -1);
            $("#check_in").datepicker('setDate', first);
        }
    }
    if (inst.id == "check_in") {
        var maxDate = dateAddDays(first, 90);
        $("#check_out").datepicker("option", "maxDate", maxDate);
    }
    var nintyDays = dateAddDays(first, 90);
    if (second > nintyDays) {
        second = nintyDays;
        $("#check_out").datepicker('setDate', second);
    }
    var diff = dayDifference(first, second);
    $("#reservationNumNights").val(diff);
    check_in = dateFormatStr(first, "/");
    check_out = dateFormatStr(second, "/");
    setDatePannelDate(first, second);
}
function nightsChange() {
    var sign = "/";
    var nights = parseInt($("#reservationNumNights").val(), 10);
    check_out = addDays(check_in, nights, sign);
    var start = changeDate(check_in, sign);
    var end = changeDate(check_out, sign);
    setDatePannelDate(start, end);
    $("#check_in").val(dateToMMDDYY(check_in, sign));
    $("#check_out").val(dateToMMDDYY(check_out, sign));
    $("#check_in").datepicker('setDate', dateToMMDDYY(check_in, sign));
    $("#check_out").datepicker('setDate', dateToMMDDYY(check_out, sign));
}
function setDatePannelDate(startDay, endDay) {
    $("#datePannel li.select").removeClass("select");
    var chartStart = $("#datePannel ul#month1 li[dateval]:first").attr("dateval");
    if (chartStart) {
        chartStart = changeDate(chartStart, "/");
    }
    var chartLast = $("#datePannel ul#month1 li[dateval]:last").attr("dateval");
    if (chartLast) {
        chartLast = changeDate(chartLast, "/");
    }
    if (startDay < chartStart || startDay > chartLast) {
        Date_init("/", false, true);
    }
    else {
        var tempDate = startDay;
        while (tempDate <= endDay) {
            var tempDateString = dateFormatStr(tempDate, "/");
            $("#datePannel li[dateVal='" + tempDateString + "']").addClass("select");
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }
}

function changeOrbitHTML(obj) {
    $(obj).each(function () {
        var ul = $(this);
        var images = ul.find("li>img");
        if (images.length > 0) {
            images.unwrap();
            var className = ul.get(0).className;
            $('<div class="OrbitImages"></div>').insertAfter(ul).append(ul.children()).wrap('<div class="' + className + '"></div>');
            ul.remove();
        }
    });
}
function orbitShowInit(obj) {
    if ($(obj).parent().hasClass("orbit-wrapper")) {
        return;
    }
    var liImgs = $(obj).find("img");
    if (liImgs.length > 1) {
        $(obj).orbit({'timer': true});
    }
}

/*--------------------------------------------------
 :: Section Mechanics
 --------------------------------------------------*/
function openCurrentSection(openRoomID) {
    var rows = $(".sectionRow"), currentSection = rows.eq(currSectionIndex);
    correctStatusClasses(rows);
    correctStatusClasses($(".number-block"));

    // Hide done rooms
    rows.show();
    rows.slice(currSectionIndex + 1).filter(function () {
        return $(this).hasClass("room-row");
    }).hide();

    if (currentSection.attr("id") == "mainRow") {
        $("#availabilityBtn").removeClass("disabled-btn");
        return;
    } else if (currentSection.attr("id") == "summaryRow") {
        initSummaryPage();
    }
    else {      // Room Row
        var isFirstTime = !currentSection.find(".form-room").hasClass("hide");
        if (isFirstTime) {
            var index = $(".room-row").index(currentSection);
            if (openRoomID != undefined) {
                search(index, openRoomID);
            }
            else {
                search(index);
            }
        }
        else {  // Edit packages
            currentSection.add($(".number-block").eq(currSectionIndex)).unbind("click");
        }
    }
}
function openNextSection(openRoomID) {
    var rows = $(".sectionRow"), currSection = null;
    do {
        currSection = rows.eq(++currSectionIndex);
    } while (currSectionIndex < rows.length && currSection.hasClass("room-row") && currSection.hasClass("done"))

    openCurrentSection(openRoomID);
}
function correctStatusClasses(objList) {
    objList.removeClass("show");
    objList.slice(0, currSectionIndex).addClass("done");
    objList.eq(currSectionIndex).removeClass("done").addClass("show");
}
function correctSectionNums() {
    $(".number-block").each(function (x, v) {
        $(this).find(".section-num").text(x + 1);
    });
    var numRooms = $(".room-row").length, innerTxt;
    if (numRooms > 1) {
        $(".room-row").each(function (x, v) {
            innerTxt = localizeSpan("be_room") + " " + (x + 1) + ":";
            $(this).find(".room-tracker-text").html(innerTxt).show();
        });
    }
    else {
        $(".room-row .room-tracker-text").hide();
    }
}

/*--------------------------------------------------
 :: Detail Popups
 --------------------------------------------------*/
function SetPosition(obj) {
    var pannel = $(obj);
    var scrollLeft = $(document).scrollLeft();
    var scrollTop = $(document).scrollTop();
    var docWidth = window.top.document.documentElement.clientWidth;
    var docHeight = window.top.document.documentElement.clientHeight;
    var popupHeight = pannel.height();
    var popupWidth = pannel.width();
    var top = 0;
    var left = 0;
    if (docWidth > popupWidth)
        left = (docWidth - popupWidth) / 2 + scrollLeft;
    if (left <= 0)
        left = 0;
    if (docHeight > popupHeight)
        top = (docHeight - popupHeight) / 2 + scrollTop;
    if (top <= 0)
        top = scrollTop;
    pannel.css({
        "position": "absolute",
        "top": top,
        "left": left,
        "z-index": 1000
    });

}
function closeMakeDiv() {
    $("#div_Cover").remove();
}
function MakeDiv() {
    $("#div_Cover").remove();
    var w = ($.browser.msie) ? ($.browser.version == "7.0" ? $(document).width() : $(document).width() - 21) : $(document).width();
    var h = $(document).height();
    var overlay = $(document.createElement("div"));
    overlay.attr("id", "div_Cover");
    overlay.css({
        position: "absolute",
        "z-index": 100,
        left: 0,
        top: 0,
        zoom: 1,
        width: w,
        height: h,
        opacity: "0.7",
        filter: "Alpha(opacity=70)",
        background: "#000"
    }).appendTo($(document.body));

}
function OpenPromotionalDetail(displayName, desc, roomData) {
    var pannel = $("#promotionDetailPannel");
    pannel.show();
    SetPosition(pannel);
    pannel.find(".promotiontitle").html(displayName);
    if (desc != "") {
        pannel.find(".descont").html(desc);
    }
    else {
        pannel.find(".descont").html("");
    }
    var rateDivObj = pannel.find(".rates");
    if (reservationVendor == BookingCenterName) {
        rateDivObj.hide();
    }
    else {
        var roomsids = roomData.ID.split('-');
        var startDate, endDate;
        if (roomsids.length > 4) {
            var temp = roomsids[3];
            startDate = new Date(temp.substring(0, 4), parseInt(temp.substring(4, 6), 10) - 1, temp.substring(6, 8));
            temp = roomsids[4];
            endDate = new Date(temp.substring(0, 4), parseInt(temp.substring(4, 6), 10) - 1, temp.substring(6, 8));
        }
        var weekday = ["be_sun", "be_mon", "be_tue", "be_wed", "be_thr", "be_fri", "be_sat"];
        var startDay = startDate.getDay();
        var weekObj = pannel.find("ul.weekDays");
        weekObj.html("");
        for (var index = 0; index < 7; index++) {
            var dateLI = '<li class="localize" key="' + weekday[startDay] + '">' + LocalizeKey(lang, weekday[startDay]) + '</li>';
            startDay = (startDay + 1) % 7;
            weekObj.append(dateLI);
        }
        var ratePrice = roomData.perNightRateNotes;
        var rateObj = pannel.find("ul.dailyRate");
        rateObj.html("");
        rateDivObj.show();
        $.each(ratePrice, function (index, value) {
            var roomPrice = '<li><span>' + dateToString(startDate) + '</span><br/><span class="price">' + value + ' <span class="currency">' + currencySymbol + '</span></span></li>';
            rateObj.append(roomPrice);
            startDate.setDate(startDate.getDate() + 1);
        });
    }
    var resBtn = $("<a class='res-btn' href='#' >" + localizeSpan("be_reserve") + "</a>");
    var bottom = pannel.find(".fbottom");
    bottom.html("");
    bottom.append(resBtn);
    resBtn.attr("rateid", roomData.ID).attr("roomSegmentID", roomData.roomSegmentID).click(function () {
        var rateid = $(this).attr("rateid");
        var roomSegmentID = $(this).attr("roomSegmentID");
        addRoom(rateid, roomSegmentID, 1);
        $(".makeDiv").hide();
        closeMakeDiv();
        return false;
    });
    MakeDiv();
    if (desc != "") {
        pannel.find(".descont .slideimgs").each(function () {
            var thisimg = $(this).find("img");
            thisimg.each(function () {
                var imageURL = $(this).attr("src").replace(/http:\/\/[^\/]+/, cdnImageServer);
                imageURL = getImgBySize(imageURL);
                $(this).attr("src", imageURL);
                $(this).error(function () {
                    imageError($(this));
                });
            });
            //slideshowInit($(this));
            changeOrbitHTML(this)
        });
        pannel.find("div.slideimgs .OrbitImages").each(function () {
            orbitShowInit(this);
        });
    }
}
function OpenReservationPolicy() {
    var pannel = $("#ReservationPolicyPannel");
    pannel.show();
    SetPosition(pannel);
    MakeDiv();
    return false;
}
function OpenAddOnDetail(addOnData) {
    var pannel = $("#addOnDetailPannel");
    pannel.show();
    SetPosition(pannel);
    pannel.find(".addOnTitle").html(addOnData.packageName);
    pannel.find(".descont").html(addOnData.longDescription);
    MakeDiv();
    pannel.find(".descont .slideimgs").each(function () {
        var thisimg = $(this).find("img");
        thisimg.each(function () {
            var imageURL = $(this).attr("src").replace(/http:\/\/[^\/]+/, cdnImageServer);
            imageURL = getImgBySize(imageURL);
            $(this).attr("src", imageURL);
            $(this).error(function () {
                imageError($(this));
            });
        });
        changeOrbitHTML(this);
        //slideshowInit($(this));
    });
    pannel.find("div.slideimgs .OrbitImages").each(function () {
        orbitShowInit(this);
    });
}
function DoneSearchClickPanel() {
    clickedIndex = 0;
    var panel = OpenMessagingPanel("#searchPanel");

    panel.find(".user-msg").html(localizeSpan("be_warning_edit_dates"));
    panel.find(".edit-dates").unbind("click").click(function () {
        resetPage();
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
    panel.find(".cancel-btn").unbind("click").click(function () {
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
}
function DoneRoomClickPanel(roomSection) {
    clickedIndex = $(".sectionRow").index(roomSection);
    var panel = OpenMessagingPanel("#roomPanel");

    // If no packages exist, do not show 'edit packages'
    var showEditPackages = (roomSection.find(".form-addons .item").length > 0);
    panel.find(".edit-packages").toggle(showEditPackages);

    panel.find(".delete-room").unbind("click").click(function () {
        editRoom();
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
    panel.find(".edit-packages").unbind("click").click(function () {
        editPackages();
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
    panel.find(".cancel-btn").unbind("click").click(function () {
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
}
function OpenMessagingPanel(searchVal) {
    var panel = $(searchVal);
    panel.show();
    SetPosition(panel);
    MakeDiv();
    $(".makeDiv .close").click(function () {
        $(".makeDiv").hide();
        closeMakeDiv();
    });
    return panel;
}
function OpenRoomSearhErrorPannel(roomIndex) {
    var panel = OpenMessagingPanel("#roomSearchError");
    panel.find(".user-msg").html(LocalizeKey(lang, "be_roomSearchError").replace("{$1$}", roomIndex + 1));
    panel.find(".continue-btn .sub-title").html(LocalizeKey(lang, "be_roomSearchError_continue_btn").replace("{$1$}", queryData.roomsnum - 1));
    panel.find(".continue-btn").unbind("click").click(function () {
        queryData.roomsData.splice(roomIndex, 1);
        queryData.roomsnum = queryData.roomsnum - 1;
        var roomsText = queryData.roomsnum + " " + localizeSingPlural("be_room", queryData.roomsnum);
        $(".search-quantity .roomNum").text(roomsText);
        $(".search-quantity .adultChildNum").html(multiGuestsToDisplay());
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        var roomSection = $(".room-row").eq(roomIndex);
        var index = $(".sectionRow").index(roomSection);
        $(".number-block").eq(index).remove();
        var editFlag = false;
        if (roomSection.attr("editFlag") == "true") {
            editFlag = true;
        }
        roomSection.remove();
        correctSectionNums();
        if (editFlag) {
            openNextSection();
        }
        else {
            openCurrentSection();
        }
        return false;
    });
    panel.find(".edit-btn").unbind("click").click(function () {
        resetPage();
        $(this).parents(".frame").find(".ftop .close").trigger("click");
        return false;
    });
}
/*--------------------------------------------------
 :: Availability Chart
 --------------------------------------------------*/
var ACStart = "";
var ACEnd = "";
var ACRoomID = "";
var ACStartFlag = true;
var ACSelectDate = new Date();
var ACAdults;
var ACChildren;
var ACInitFlag = false;
function AvailabilityChartInit() {
    if (ACInitFlag) return true;
    var today = new Date();
    $(".AvailabilityChartPannel .close").click(function () {
        $(".makeDiv").hide();
        closeMakeDiv();
    });
    $(".AvailabilityChartPannel .date-pick").datepicker({
        dateFormat: "dd/mm/yy", createButton: false, selectMultiple: false, minDate: today,
        onSelect: function (selectedDate) {
            var select = changeDate(dateToYYMMDD(selectedDate, "/"), "/");
            ACSelectDate = select;
            getAvailabilityData(select);
        }
    });
    localizeDatepicker($(".AvailabilityChartPannel .date-pick"));
    $('.AvailabilityChartPannel .date-pick').keydown(function () {
        return false;
    });

    $(".AvailabilityChart .preTwoWeek").click(function () {
        var nowDate = new Date();
        if (ACSelectDate > nowDate) {
            ACSelectDate.setDate(ACSelectDate.getDate() - 14);
            getAvailabilityData(ACSelectDate);
        }
    });
    $(".AvailabilityChart .nextTwoWeek").click(function () {
        ACSelectDate.setDate(ACSelectDate.getDate() + 14);
        getAvailabilityData(ACSelectDate);
    });
    $(".AvailabilityChartPannel #viewRoomRates").hide();
    var numAdults = queryData.roomsData[0].numadults;
    var numChildren = queryData.roomsData[0].numchildren;
    ACAdults = numAdults;
    ACChildren = numChildren;
    $(".AvailabilityChartPannel .numAdults option[value='" + numAdults + "']").attr("selected", true);
    $(".AvailabilityChartPannel .numChildren option[value='" + numChildren + "']").attr("selected", true);
    $(".AvailabilityChartPannel #viewRoomRates").click(function () {
        selectRoomInAvailChart();
        return false;
    });
    $(".AvailabilityChartPannel .numAdults,.AvailabilityChartPannel .numChildren").bind("change", function () {
        getAvailabilityData(ACSelectDate);
    });
    ACInitFlag = true;
}
function getAvailabilityData(startDate, endDate) {
    if (IsAjaxLock) return;
    if (!startDate) {
        startDate = new Date();
        ACSelectDate = startDate;
        $(".AvailabilityChartPannel .ACStartDate").val(dateToMMDDYY(dateFormatStr(ACSelectDate, "/"), "/"));
    }
    if (!endDate) {
        endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        endDate.setDate(endDate.getDate() + 13);
    }
    ACSelectDate = startDate;
    var posturl = "/beapi/rest/rsearch/dailyavailability" + "?ts=" + Math.random();
    ;
    var adults = $(".AvailabilityChartPannel .numAdults").val();
    var children = $(".AvailabilityChartPannel .numChildren").val();
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "queryStartDate": dateFormatStr(startDate),
        "queryEndDate": dateFormatStr(endDate),
        "domain": domain,
        "numAdults": adults,
        "numChildren": children
    };
    $.ajax({
        type: "post",
        url: posturl,
        dataType: "json",
        data: postData,
        beforeSend: function () {
            IsAjaxLock = true;
            var loadingP = $("#loadingP");
            loadingP.show();
            SetPosition(loadingP);
            $(".AvailabilityChartPannel #viewRoomRates").hide();
        },
        success: function (jsonData) {
            if (jsonData.status && jsonData.status == "success") {
                setAvailabilityHeader(jsonData);
                setAvailabilityBody(jsonData);
                $(".AvailabilityChartPannel .ACStartDate").val(dateToMMDDYY(dateFormatStr(ACSelectDate, "/"), "/"));
                ACAdults = adults;
                ACChildren = children;
            }
            else {
            }
            IsAjaxLock = false;
            var loadingP = $("#loadingP");
            loadingP.hide();
        },
        error: function () {
            IsAjaxLock = false;
            var loadingP = $("#loadingP");
            loadingP.hide();
        }
    });
    /*
     var testJson = { "startDate": { "year": 2012, "month": 2, "dayOfMonth": 13 }, "endDate": { "year": 2012, "month": 2, "dayOfMonth": 26 }, "roomAvailabilities": [{ "ID": "1176", "SortID": 1176, "name": "New Segment", "roomCategory": "Default Category", "units": 1, "startDate": { "year": 2012, "month": 2, "dayOfMonth": 13 }, "endDate": { "year": 2012, "month": 2, "dayOfMonth": 26 }, "availability": [true, true, true, true, true, true, true, true, true, true, true, true, true, true] }, { "ID": "1177", "SortID": 1176, "name": "New Segment222", "roomCategory": "Default Category", "units": 1, "startDate": { "year": 2012, "month": 2, "dayOfMonth": 13 }, "endDate": { "year": 2012, "month": 2, "dayOfMonth": 26 }, "availability": [true, true, true, true, false, true, true, true, false, true, true, false, true, true]}], "category": "dailyavail", "operation": "list", "timestamp": 1329162316065, "duration": 5, "status": "success", "message": "", "code": "" };
     setAvailabilityHeader(testJson);
     setAvailabilityBody(testJson);*/
}
function setAvailabilityHeader(data) {
    var header = $(".AvailabilityChart .roomsHeader ul.ACDates").html("");
    var starDate = getJsonDate(data.startDate);
    var endDate = getJsonDate(data.endDate);
    var displayDate = starDate;
    var months = ['be_jan', 'be_feb', 'be_mar', 'be_apr', 'be_may', 'be_jun', 'be_jul', 'be_aug', 'be_sep', 'be_oct', 'be_nov', 'be_dec'];
    var days = ["be_sun", "be_mon", "be_tue", "be_wed", "be_thr", "be_fri", "be_sat"];
    var startMonth = months[displayDate.getMonth()];
    var startYear = displayDate.getFullYear();
    $(".MonthHeader .startMonth").text("");
    $(".MonthHeader .endMonth").text("");
    $(".MonthHeader .startMonth").text(LocalizeKey(lang, startMonth) + " " + startYear);
    var nextMonth = 0;
    var nowDate = new Date();
    if (starDate <= nowDate) {
        $(".AvailabilityChart .preTwoWeek .preIcon").addClass("pre-no-back");
    }
    else {
        $(".AvailabilityChart .preTwoWeek .preIcon").removeClass("pre-no-back");
    }
    while (displayDate <= endDate) {
        if (months[displayDate.getMonth()] != startMonth) {
            startMonth = months[displayDate.getMonth()];
            startYear = displayDate.getFullYear();
            $(".MonthHeader .endMonth").text(LocalizeKey(lang, startMonth) + " " + startYear);
            nextMonth = 1;
        }
        var showContent = "<span class='ACDates-day'>" + LocalizeKey(lang, days[displayDate.getDay()]) + "</span><br /><span class='ACDates-num'>" + displayDate.getDate() + "</span>";
        $("<li class='" + dateFormatStr(displayDate) + "' nextMonth = '" + nextMonth + "'><em>" + showContent + "</em></li>").appendTo(header);
        displayDate.setDate(displayDate.getDate() + 1);
    }
    if (nextMonth == 1) {
        var nextPos = $(".AvailabilityChart .roomsHeader ul.ACDates li[nextMonth='1']");
        if (nextPos) {
            $(".MonthHeader .endMonth").css("left", nextPos.position().left + "px");
            $(".MonthHeader .endMonth").css("position", 'absolute');
        }
    }
}
function setAvailabilityBody(data) {
    ACStart = "";
    ACEnd = "";
    ACRoomID = "";
    ACStartFlag = true;
    var starDate = getJsonDate(data.startDate);
    var endDate = getJsonDate(data.endDate);
    var roomsInfo = data.roomAvailabilities;
    var roomsList = $(".AvailabilityChart ul.roomsList");
    roomsList.html("");
    $.each(roomsInfo, function (index, room) {
        var roomID = room.roomSegmentID;
        var roomName = room.name;
        var roomAvailability = room.availability;
        var roomUL = $("<li class='room' id = '" + roomID + "'></li>");
        roomUL.appendTo(roomsList);
        var roomEM = "";
        if (index == 0) {
            roomEM = "<em class='firstEM'>" + roomName + "</em>"
        }
        else {
            roomEM = "<em>" + roomName + "</em>"
        }
        var roomNameSpan = $("<span class='tdCopyL'>" + roomEM + "</span><div class='tdCopyR'><ul class='roomAvailable'></ul></div>");
        roomNameSpan.appendTo(roomUL);
        roomNameSpan.find("em").attr("title", roomName);

        var roomAvailableUL = roomNameSpan.find("ul.roomAvailable");
        if (index == 0) {
            roomAvailableUL.addClass("firstUL");
        }
        $.each(roomAvailability, function (i, status) {
            var li;
            var roomDate = new Date(starDate.getFullYear(), starDate.getMonth(), starDate.getDate());
            var tempDate = new Date();
            tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
            roomDate.setDate(roomDate.getDate() + i);
            if (roomDate < tempDate) {
                status = false;
            }
            var liDate = dateFormatStr(roomDate, "/");

            if (status) {
                li = $("<li date='" + liDate + "'><em class='on'></em></li>");
            }
            else {
                li = $("<li date='" + liDate + "'><em class='off'></em></li>");
            }
            li.appendTo(roomAvailableUL);
            if (i == 0) {
                li.addClass("firstLI");
            }
        });
    });

    $(".AvailabilityChart ul.roomsList em.on").hover(
        function (e) {
            //var roomID = $(this).parents("li.room").get(0).id;
            $(this).addClass("hover");
        },
        function (e) {
            $(this).removeClass("hover");
            $(".AvailabilityChart .selectDateTips").hide();
        });

    $(".AvailabilityChart ul.roomsList .tdCopyR em").bind("click", function () {
        var dateString = $(this).parent("li").attr("date");
        var roomID = $(this).parents("li.room").get(0).id;

        if (ACStartFlag || ACRoomID != roomID) {
            if ($(this).hasClass("off")) {
                return;
            }
            ACRoomID = roomID;
            ACStart = dateString;
            $(".AvailabilityChart .selected").removeClass("selected");
            $(this).addClass("selected");
            $(".AvailabilityChartPannel #viewRoomRates").show();
            ACEnd = "";
            ACStartFlag = false;
            return;
        }
        else {
            checkAvailStartEnd(ACStart, dateString, roomID);
            ACStartFlag = true;
            $(".AvailabilityChartPannel #viewRoomRates").show();
        }
    });
}
function checkAvailStartEnd(start, end, roomID) {
    var room = $(".AvailabilityChart ul.roomsList li#" + roomID);
    var startObj = room.find("li[date='" + start + "']");
    var endObj = room.find("li[date='" + end + "']");
    var startDate = changeDate(start, "/");
    var endDate = changeDate(end, "/");
    var tempDate = startDate;
    if (startDate <= endDate) {
        while (tempDate <= endDate) {
            var dateObj = room.find("li[date='" + dateFormatStr(tempDate, "/") + "'] em");
            if (dateObj.hasClass("off")) {
                var tempEnd = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
                tempEnd.setDate(tempEnd.getDate() - 1);
                end = dateFormatStr(tempEnd, "/");
                break;
            }
            else {
                $(dateObj).addClass("selected");
            }
            tempDate.setDate(tempDate.getDate() + 1);
        }
    }
    else {
        while (tempDate >= endDate) {
            var dateObj = room.find("li[date='" + dateFormatStr(tempDate, "/") + "'] em");
            if (dateObj.hasClass("off")) {
                var tempEnd = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
                tempEnd.setDate(tempEnd.getDate() + 1)
                end = dateFormatStr(tempEnd, "/");
                break;
            }
            else {
                $(dateObj).addClass("selected");
            }
            tempDate.setDate(tempDate.getDate() - 1);
        }
        var temp = start;
        start = end;
        end = temp;
    }
    ACStart = start;
    ACEnd = end;
}
function selectRoomInAvailChart() {
    queryData.check_in = dateToMMDDYY(ACStart, "/");
    var endDate = ACEnd;
    if (endDate == "") {
        endDate = ACStart;
    }
    endDate = changeDate(endDate, "/");
    endDate.setDate(endDate.getDate() + 1);
    endDate = dateFormatStr(endDate, "/");
    queryData.check_out = dateToMMDDYY(endDate, "/");
    queryData.roomsData[0].numadults = ACAdults;
    queryData.roomsData[0].numchildren = ACChildren;
    $("#mainRow #check_in").val(dateToMMDDYY(ACStart, "/"));
    $("#mainRow #check_out").val(dateToMMDDYY(endDate, "/"));
    $("#mainRow #reservationNumNights").val(parseInt(compareDateTime(endDate, ACStart, "/"), 10));
    check_in = ACStart;
    check_out = endDate;
    setDatePannelDate(changeDate(ACStart, "/"), changeDate(endDate, "/"));
    var roomInput = $("#mainRow #roomToggles .room").first();
    roomInput.find(".numAdults option[value='" + ACAdults + "']").attr("selected", true);
    roomInput.find(".numChildren option[value='" + ACChildren + "']").attr("selected", true);
    $(".makeDiv").hide();
    closeMakeDiv();
    var blnFromMain = $(".AvailabilityChartPannel").attr("fromMain");
    if (blnFromMain == "true") {
        var currSection = $(".sectionRow").eq(currSectionIndex);
        $(".number-block").eq(currSectionIndex).add(currSection).click(DoneSearchClickPanel);
        $(".search-error-section").removeClass("show");
        loadSearchPage(ACRoomID);
    }
    else {
        var roomSearchTitle = dateToDisplayAbbr(queryData.check_in) + " - " + dateToDisplayAbbr(queryData.check_out);
        $(".search-title span.title-text").html(roomSearchTitle);
        $(".search-quantity .adultChildNum").html(multiGuestsToDisplay());
        search(0, ACRoomID);
    }
}
function GetHotelAvailability(startDate, endDate, callback, numRooms) {
    var posturl = "/beapi/rest/rsearch/dailyavailability" + "?ts=" + Math.random();
    ;
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "queryStartDate": dateFormatStr(startDate),
        "queryEndDate": dateFormatStr(endDate),
        "domain": domain
    };
    if (numRooms != undefined) {
        var roosmData = {
            "numRooms": numRooms
        }
        postData = $.extend(postData, roosmData);
    }
    $.ajax({
        type: "post",
        url: posturl,
        dataType: "json",
        data: postData,
        success: function (jsonData) {
            if (jsonData.status == "error") {
                OpenError(jsonData.message, jsonData.code, true);
                window.location.reload();
                return;
            }
            if (callback) {
                callback(jsonData);
            }
        }
    });
}

/*--------------------------------------------------
 :: Error Handling
 --------------------------------------------------*/
function OpenError(Msg, Code, searchFlag) {
    alert(Msg);
}
var openWarning = OpenError;

/* Make page full height */
function FullPage() {
    var bodyHeight = $("body").height();
    var accordionHeight = $("#accordion").height();
    var windowHeight = $(window).height();

    if (bodyHeight < windowHeight) {
        var newHeight = accordionHeight + windowHeight - bodyHeight;
        $('#accordion').css('min-height', newHeight);
    }
}

