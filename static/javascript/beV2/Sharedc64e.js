/*--------------------------------------------------
 :: Global vars
 --------------------------------------------------*/
// Consts
var CountryNames = ["be_Afghanistan", "be_Albania", "be_Algeria", "be_Andorra", "be_Angola", "be_Antigua_and_Barbuda", "be_Argentina", "be_Armenia", "be_Australia", "be_Austria", "be_Azerbaijan", "be_Bahamas_The", "be_Bahrain", "be_Bangladesh", "be_Barbados", "be_Belarus", "be_Belgium", "be_Belize", "be_Benin", "be_Bhutan", "be_Bolivia", "be_Bosnia_and_Herzegovina", "be_Botswana", "be_Brazil", "be_Brunei", "be_Bulgaria", "be_Burkina Faso", "be_Burma", "be_Burundi", "be_Cambodia", "be_Cameroon", "be_Canada", "be_Cape_Verde", "be_Central_African_Republic", "be_Chad", "be_Chile", "be_China", "be_Colombia", "be_Comoros", "be_Congo_Brazzaville", "be_Congo_Kinshasa", "be_Costa_Rica", "be_Cote_dIvoire", "be_Croatia", "be_Cuba", "be_Cyprus", "be_Czech_Republic", "be_Denmark", "be_Djibouti", "be_Dominica", "be_Dominican Republic", "be_East_Timor_see_Timor_Leste", "be_Ecuador", "be_Egypt", "be_El_Salvador", "be_Equatorial_Guinea", "be_Eritrea", "be_Estonia", "be_Ethiopia", "be_Fiji", "be_Finland", "be_France", "be_Gabon", "be_Gambia_The", "be_Georgia", "be_Germany", "be_Ghana", "be_Greece", "be_Grenada", "be_Guatemala", "be_Guinea", "be_Guinea_Bissau", "be_Guyana", "be_Haiti", "be_Holy_See", "be_Honduras", "be_Hong_Kong", "be_Hungary", "be_Iceland", "be_India", "be_Indonesia", "be_Iran", "be_Iraq", "be_Ireland", "be_Israel", "be_Italy", "be_Jamaica", "be_Japan", "be_Jordan", "be_Kazakhstan", "be_Kenya", "be_Kiribati", "be_Korea_North", "be_Korea_South", "be_Kosovo", "be_Kuwait", "be_Kyrgyzstan", "be_Laos", "be_Latvia", "be_Lebanon", "be_Lesotho", "be_Liberia", "be_Libya", "be_Liechtenstein", "be_Lithuania", "be_Luxembourg", "be_Macau", "be_Macedonia", "be_Madagascar", "be_Malawi", "be_Malaysia", "be_Maldives", "be_Mali", "be_Malta", "be_Marshall_Islands", "be_Mauritania", "be_Mauritius", "be_Mexico", "be_Micronesia", "be_Moldova", "be_Monaco", "be_Mongolia", "be_Montenegro", "be_Morocco", "be_Mozambique", "be_Namibia", "be_Nauru", "be_Nepal", "be_Netherlands", "be_Netherlands_Antilles", "be_New_Zealand", "be_Nicaragua", "be_Niger", "be_Nigeria", "be_North_Korea", "be_Norway", "be_Oman", "be_Pakistan", "be_Palau", "be_Palestinian_Territories", "be_Panama", "be_Papua_New_Guinea", "be_Paraguay", "be_Peru", "be_Philippines", "be_Poland", "be_Portugal", "be_Qatar", "be_Romania", "be_Russia", "be_Rwanda", "be_Saint_Kitts_and_Nevis", "be_Saint_Lucia", "be_Saint_Vincent_and_the_Grenadines", "be_Samoa", "be_San_Marino", "be_Sao_Tome_and_Principe", "be_Saudi_Arabia", "be_Senegal", "be_Serbia", "be_Seychelles", "be_Sierra_Leone", "be_Singapore", "be_Slovakia", "be_Slovenia", "be_Solomon_Islands", "be_Somalia", "be_South_Africa", "be_South_Korea", "be_Spain", "be_Sri_Lanka", "be_Sudan", "be_Suriname", "be_Swaziland", "be_Sweden", "be_Switzerland", "be_Syria", "be_Taiwan", "be_Tajikistan", "be_Tanzania", "be_Thailand", "be_Timor_Leste", "be_Togo", "be_Tonga", "be_Trinidad_and_Tobago", "be_Tunisia", "be_Turkey", "be_Turkmenistan", "be_Tuvalu", "be_Uganda", "be_Ukraine", "be_United_Arab_Emirates", "be_United_States_of_America", "be_United_Kingdom", "be_Uruguay", "be_Uzbekistan", "be_Vanuatu", "be_Venezuela", "be_Vietnam", "be_Yemen", "be_Zambia", "be_Zimbabwe"];
var dayNamesShort = ["be_sun", "be_mon", "be_tue", "be_wed", "be_thr", "be_fri", "be_sat"];
var monthNamesShort = ["be_jan", "be_feb", "be_mar", "be_apr", "be_may", "be_jun", "be_jul", "be_aug", "be_sep", "be_oct", "be_nov", "be_dec"];

var IsLoadFinish = false;
// Url Params
var apiDomain = "https://apiqa2preview.buuteeq.com";
var cdnImageServer = "//dw38l979td36g.cloudfront.net"
var imgServer = "//qa2img.buuteeq.com";
var domain = "";
var medium = "";
var source = "";
var channel = "";
var hotelid = 0;
var lang = "en-us";
var key = 12345;
var check_in = "";
var check_out = "";
var numrooms = 1;
var lastUrl;

// Hotel Data
var currencySymbol = "USD";
var hotelName = "";
var reservationPolicyDescription = "";
var isprocodeclick = false; //???????????????
var IsAjaxLock = false;
var Istimer;
var IstimerCount = 0;
var IsUseInventory = false;
var campaignDomain = "devanalytics.buuteeq.com";
var BookingCenterName = "bookingcenter";
var reservationVendor = "";
var isRoomInCart = false;
var GuestInformationMessage = "";
var ThankYouTitle = "Thank You";
var ThankYouMessage = "";
var AcceptCardType = null;
var needCreditCard = false;
var needSecurityCode = false;
var clientCountry = "";

var cartId = "";
var queryData = null;

var rooms = null;
var promotions = null;
var rateid = null;
var currentCart = null;
var specialRequest = "";
var initialHash = null;
var blnDisplayTax = false;

// Analytics
var mobileBE = " | MobileBE:No";
var mobileBE2 = "&MobileBE=No";
var mobileBE3 = "desktop";

// Adwords
var revenue = 0;

/*--------------------------------------------------
 :: Page-level Functions
 --------------------------------------------------*/
function initLoad(params) {
    if (!params) {
        params = window.location.hash;
        if (params.indexOf("?") != -1)
            params = params.substr(params.indexOf("?") + 1);
        if (params == "") {
            window.history.go(-1);
            return;
        }
    }
    initialHash = params;

    readParams(params);
    if (channel == "") {
        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        if (mobile)
            channel = 'mobile';
        else
            channel = 'website';
    }
}

/* Ajax calls */
function readParams(params) {
    var result = "";
    var reg = /hotelid=\d*/ig;
    if ((result = reg.exec(params)) != null) {
        hotelid = result.toString().replace(/hotelid=/ig, '');
    }
    reg = /lang=\w{2}-\w{2}/ig;
    if ((result = reg.exec(params)) != null) {
        lang = result.toString().replace(/lang=/ig, '');
    }
    reg = /domain=.*/ig;
    if ((result = reg.exec(params)) != null) {
        domain = result.toString().replace(/domain=/ig, '').replace(/&.*/ig, '');
        $(".logo").attr("href", "http://" + domain + "/" + lang + "/");

        if (domain.indexOf("qa2preview.buuteeq.com") != -1) {
            apiDomain = "//apiqa2preview.buuteeq.com";
            imgServer = "//qa2img.buuteeq.com";
        }
        else if (domain.indexOf("dev2preview.buuteeq.com") != -1) {
            apiDomain = "//marseille.buuteeq.com";
            imgServer = "//qa2img.buuteeq.com";
        }
        else if (domain.indexOf("preview.buuteeq.com") != -1) {
            apiDomain = "//apipreview.buuteeq.com";
            imgServer = "//img.buuteeq.com";
        }
        else if (domain.indexOf("qa2sweet.buuteeq.com") != -1) {
            apiDomain = "//apiqa2sweet.buuteeq.com";
            imgServer = "//qa2img.buuteeq.com";
        }
        else {
            apiDomain = "//apisweet.buuteeq.com";
            imgServer = "//img.buuteeq.com";
            campaignDomain = "analytics.buuteeq.com";
        }
    }

    reg = /check_in=\d{4}-\d{1,2}-\d{1,2}/;
    var currentDate = new Date();
    var nowDateString = dateFormatStr(currentDate, "/");
    //yyyy-mm-dd to yyyy/mm/dd
    if ((result = reg.exec(params)) != null) {
        check_in = result.toString().replace(/check_in=/, '').replace(/-/g, "/");
        if (compareDateTime(nowDateString, check_in, "/") >= 0) {
            check_in = nowDateString;
        }
    }
    else {
        check_in = nowDateString;
    }
    reg = /check_out=\d{4}-\d{1,2}-\d{1,2}/;
    if ((result = reg.exec(params)) != null) {
        check_out = result.toString().replace(/check_out=/, '').replace(/-/g, "/");
    }
    else {
        check_out = addDays(check_in, 1, "/");
    }

    reg = /PromotionalCode=.*/ig;
    if ((result = reg.exec(params)) != null) {
        $("#promocode").val(result.toString().replace(/PromotionalCode=/ig, '').replace(/&.*/ig, ''));
    }
    reg = /numberofrooms=\d/ig;
    if ((result = reg.exec(params)) != null) {
        var tempNumrooms = parseInt(result.toString().replace(/numberofrooms=/ig, ''));
        if (tempNumrooms && tempNumrooms >= 1 && tempNumrooms <= 5) numrooms = tempNumrooms;
    }
    reg = /lasturl=.*/ig;
    if ((result = reg.exec(params)) != null) {
        lastUrl = result.toString().replace(/lasturl=/ig, '').replace(/&.*/ig, '');
        lastUrl = decodeURIComponent(base64_decode(lastUrl));
        if (lastUrl.indexOf('fbprod1.buuteeq.com') > -1)
            channel = 'social';
    }
    if (lastUrl != "") {
        $(".returnLink").attr("href", lastUrl);
    }
    else {
        $(".returnLink").attr("href", 'http://' + domain);
    }
    reg = /medium=.*/ig;
    if ((result = reg.exec(params)) != null) {
        medium = result.toString().replace(/medium=/ig, '').replace(/&.*/ig, '');
        medium = decodeURIComponent(medium);
    }
    reg = /source=.*/ig;
    if ((result = reg.exec(params)) != null) {
        source = result.toString().replace(/source=/ig, '').replace(/&.*/ig, '');
        source = decodeURIComponent(base64_decode(source));
        if (source.indexOf('fbprod1.buuteeq.com') > -1)
            channel = 'social';
    }
}

function AjaxPost(postorget, url, postData, backCall, async) {
    $.ajax({
        type: postorget,
        url: url,
        dataType: "json",
        data: postData,
        async: (async ? true : async),
        beforeSend: function () {
            IsAjaxLock = true;
            if ($.mobile) {
                $.mobile.showPageLoadingMsg("b", "Querying...");
            } else {
                MakeDiv();
                var loadingP = $("#loadingP");
                loadingP.show();
                SetPosition(loadingP);
            }
        },
        success: function (returndata, textStatus) {
            var loadingP = $("#loadingP");
            loadingP.hide();
            IsAjaxLock = false;
            IsLoadFinish = true;
            if (returndata.message != undefined && returndata.status == "error" && returndata.message.toLocaleLowerCase() == "Your Booking Cart is no longer valid.".toLocaleLowerCase()) {
                OpenError(returndata.message);

                $(".bknow").show();
                var posturl = "/beapi/rest/rsearch/hotelinfo#";
                var postDatas = {
                    "key": key,
                    "hotelId": hotelid,
                    "format": "json",
                    "lang": lang,
                    "domain": domain,
                    "cartId": ""
                };
                AjaxPost("post", posturl, postDatas, function (data) {
                    if (data.cartId != undefined) cartId = data.cartId;
                    if (resetPage) return resetPage();
                });

                return;
            }
            if (backCall) {
                try {
                    backCall(returndata);
                } catch (e) {
                    console.log("AjaxPost: " + e.message);
                }
            }
            if (url == "/beapi/rest/cart/purchase") {
                var loadingImg = $("#loadingImg");
                loadingImg.hide();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus != null && textStatus == "timeout") {
                OpenError(LocalizeKey(lang, "be_timeout"));
                window.location.reload();
            }
            var loadingP = $("#loadingP");
            loadingP.hide();
            IsAjaxLock = false;
            IsLoadFinish = true;
            if (url == "/beapi/rest/cart/purchase") {
                closeMakeDiv();
            }
        },
        complete: function () {
            if ($.mobile) {
                $.mobile.hidePageLoadingMsg();
            } else {
                closeMakeDiv();
                var loadingP = $("#loadingP");
                loadingP.hide();
            }
            IsAjaxLock = false;
            IsLoadFinish = true;
        }
    });
}

function addMultiplePackages(selections, callback, parentId) {
    var successFlag = false;
    if (IsAjaxLock) return successFlag;
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "cartId": cartId,
        "selections": JSON.stringify(selections),
        "parentItemId": parentId
    };
    var posturl = "/beapi/rest/cart/addPackages";
    AjaxPost("post", posturl, postData, function (data) {
        if (data.status == "success") {
            setCart(data);
            try {
                $.each(selections, function (i, selection) {
                    var package;
                    var packagePrice;
                    $.each(data.cartItems, function (i, item) {
                        if (item.itemType == "package") {
                            var choiceItem = item.packageChoiceItem;
                            if (choiceItem.ID == selection.sku) {
                                package = choiceItem.packageName;
                                packagePrice = parseInt(choiceItem.totalPriceAfterTax.replace(",", ""));
                                return false;
                            }
                        }
                    });
                    if (package && packagePrice) {
                        for (i = 0; i < selection.amount; i++) {
                            _gaq.push(
                                ['_setAccount', 'UA-20758296-1'],
                                ['_trackEvent', 'Booking Engine', 'Add Package', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + package + ' | Currency:' + currencySymbol + ' | Medium:' + medium + ' | Source:' + source + mobileBE, packagePrice]);
                            if (gaCode != "") {
                                _gaq.push(
                                    ['_setAccount', gaCode],
                                    ['_trackEvent', 'Booking Engine', 'Add Package', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + package + ' | Currency:' + currencySymbol + ' | Medium:' + medium + ' | Source:' + source + mobileBE, packagePrice]);
                            }
                        }
                        piwikTracker.trackPageView('/Add_Package?Package=' + package + '&Currency=' + currencySymbol + '&Quantity=' + selection.amount.toString() + '&Value=' + (packagePrice * selection.amount).toString() + mobileBE2);
                    }
                });
            } catch (err) {
            }
            initPiwik();
            piwikTracker.trackEcommerceCartUpdate(setPiwikCart(data));
            if (callback)
                callback();
            successFlag = true;
        }
        else {
            OpenError(data.message);
        }
    });
    return successFlag;
}

function addPackage(PackageID, amount, callback, parentId) {
    var successFlag = false;
    if (IsAjaxLock) return successFlag;
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "cartId": cartId,
        "sku": PackageID,
        "amount": amount,
        "parentItemId": parentId
    };
    var posturl = "/beapi/rest/cart/addPackage";
    AjaxPost("post", posturl, postData, function (data) {
        if (data.status == "success") {
            setCart(data);
            var len = data.cartItems.length;
            if (len <= 1) {
                $(".summary-link").text("No, thanks").removeClass("continue-btn");
            }
            else {
                $(".summary-link").text("Continue").addClass("continue-btn");
            }
            if (callback)
                callback();
            successFlag = true;
            if (amount > 0) {
                try {
                    var package;
                    var packagePrice;
                    $.each(data.cartItems, function (i, item) {
                        if (item.itemType == "package") {
                            var choiceItem = item.packageChoiceItem;
                            if (choiceItem.ID == PackageID) {
                                package = choiceItem.packageName;
                                packagePrice = parseInt(choiceItem.totalPriceAfterTax.replace(",", ""));
                                return false;
                            }
                        }
                    });
                    if (package && packagePrice) {
                        for (i = 0; i < amount; i++) {
                            _gaq.push(
                                ['_setAccount', 'UA-20758296-1'],
                                ['_trackEvent', 'Booking Engine', 'Add Package', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + package + ' | Currency:' + currencySymbol + ' | Medium:' + medium + ' | Source:' + source + mobileBE, packagePrice]);
                            if (gaCode != "") {
                                _gaq.push(
                                    ['_setAccount', gaCode],
                                    ['_trackEvent', 'Booking Engine', 'Add Package', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + package + ' | Currency:' + currencySymbol + ' | Medium:' + medium + ' | Source:' + source + mobileBE, packagePrice]);
                            }
                        }
                    }
                } catch (err) {
                }
            }
        }
        else {
            OpenError(data.message);
        }
    });
    return successFlag;
}

function setReservationTitle(obj, firstname, lastname) {
    var summaryTitle = "";
    if (IsUseInventory) {
        summaryTitle = localizeSpan("be_reservation_confirmation_for");
    }
    else {
        summaryTitle = localizeSpan("be_reservation_inquery_for");
    }
    summaryTitle += " <span class='res-name'></span>";
    obj.html(summaryTitle);
    obj.find("span.res-name").text(firstname + " " + lastname);
}

function validateExpiration(obj, selectMonth, selectYear) {
    var nowDate = new Date(), id = obj.attr("id");
    var nowMonth = nowDate.getMonth() + 1, nowYear = nowDate.getFullYear();

    var setError = false;
    if ($.trim(obj.val()) == "") setError = true;
    else if ((id == "ccYear" || id == "ccExpiration") && selectYear < nowYear) setError = true;
    else if ((id == "ccMonth" || id == "ccExpiration") && (selectYear == nowYear && selectMonth < nowMonth)) setError = true;

    if (setError) {
        obj.addClass("error");
        obj.prev("label").find(".star").addClass("star-error");
    }
    else {
        obj.prev("label").find(".star").removeClass("star-error");
    }
}

function checkExpirations() {
    $("#ccMonth,#ccYear").each(function () {
        var selectMonth = $.trim($("#ccMonth").val()), selectYear = $.trim($("#ccYear").val());
        $(this).removeClass("error").next("span.show").remove();
        validateExpiration($(this), selectMonth, selectYear);
        if ($(this).hasClass("error")) {
            $(this).after('<span class="show error"></span>');
        }
    });
    $("#ccExpiration").each(function () {
        var vals = ($(this).val().indexOf("/") != -1 ? $(this).val() : "/").split("/");
        $(this).removeClass("error").next("span.show").remove();
        validateExpiration($(this), vals[0], vals[1]);
        if ($(this).hasClass("error")) {
            $(this).after('<span class="show error"></span>');
        }
    });
}

function bookNowClick() {
    if ($(this).hasClass("disabled-btn")) {
        return false;
    }

    $("#firstname,#lastname,#address1,#city,#state").each(function () {
        var obj = $(this);
        obj.next("span.show").remove();
        if ($.trim(obj.val()) == "") {
            obj.after('<span class="show error"></span>'); //LocalizeKey(lang, "be_this_field_is_required")
            obj.addClass("error");
            obj.prev("label").find(".star").addClass("star-error");
        }
        else {
            obj.after('<span class="show ok"></span>'); //LocalizeKey(lang, "be_right")
            obj.removeClass("error");
            obj.prev("label").find(".star").removeClass("star-error");
        }
    });
    $("#phone").each(function () {
        var obj = $(this);
        obj.next("span.show").remove();
        if ($.trim(obj.val()) == "" || !validatePhonenumber($.trim(obj.val()))) {
            obj.after('<span class="show error"></span>');
            obj.addClass("error");
            obj.prev("label").find(".star").addClass("star-error");
        }
        else {
            obj.after('<span class="show ok"></span>');
            obj.removeClass("error");
            obj.prev("label").find(".star").removeClass("star-error");
        }
    });
    $("#resvemail").each(function () {
        var obj = $(this);
        obj.next("span.show").remove();
        if ($.trim(obj.val()) == "") {
            obj.after('<span class="show error"></span>'); //LocalizeKey(lang, "be_this_field_is_required")
            obj.addClass("error");
            obj.prev("label").find(".star").addClass("star-error");
        }
        else {
            if (validateEmail(obj.val()) != -1) {
                obj.after('<span class="show ok"></span>'); //LocalizeKey(lang, "be_right")
                obj.removeClass("error");
                obj.prev("label").find(".star").removeClass("star-error");
            }
            else {
                obj.after('<span class="show error"></span>'); //LocalizeKey(lang, "be_invalid_email_address")
                obj.addClass("error");
                obj.prev("label").find(".star").addClass("star-error");
            }
        }
    });

    $("#country").each(function () {
        var obj = $(this), val = $.trim(obj.val());
        obj.parent().next("span.show").remove();
        if (val == "") {
            obj.parent().after('<span class="show error"></span>'); //LocalizeKey(lang, "be_select_country");
            obj.addClass("error");
            obj.parent().addClass("error");
            obj.prev("label").find(".star").addClass("star-error");
        }
        else {
            obj.parent().after('<span class="show ok"></span>'); //LocalizeKey(lang, "be_right") ;
            obj.removeClass("error");
            obj.parent().removeClass("error");
            obj.prev("label").find(".star").removeClass("star-error");
        }
    });
    var creditCardType = "";
    if ($(".creditCardInfo").is(":visible")) {
        if (reservationVendor == BookingCenterName) {
            $("#BCAcceptedType").each(function () {
                var obj = $(this);
                obj.parent().next("span.show").remove();
                var ccType = $.trim(obj.val());
                if (ccType == "" || ccType == "0") {
                    obj.addClass("error");
                    obj.parent().addClass("error");
                    obj.prev("label").find(".star").addClass("star-error");
                }
                else {
                    obj.removeClass("error");
                    obj.parent().removeClass("error");
                    obj.prev("label").find(".star").removeClass("star-error");
                }
            });
        }
        $("#ccName").each(function () {
            var obj = $(this);
            obj.next("span.show").remove();
            if ($.trim(obj.val()) == "") {
                obj.after('<span class="show error"></span>');
                obj.addClass("error");
                obj.prev("label").find(".star").addClass("star-error");
            }
            else {
                obj.after('<span class="show ok"></span>');
                obj.removeClass("error");
                obj.prev("label").find(".star").removeClass("star-error");
            }
        });
        $("#ccNumber").each(function () {
            $("#acceptedCreditCards li span").removeClass("selected");
            var obj = $(this);
            obj.next("span.show").remove();
            if ($.trim(obj.val()) == "") {
                obj.after('<span class="show error"></span>');
                obj.addClass("error");
                obj.prev("label").find(".star").addClass("star-error");
                $(".creditTypeError").hide();
                $(".creditError").hide();
            }
            else {
                if (reservationVendor == BookingCenterName) {
                    var ccType = $.trim($("#BCAcceptedType").val());
                    if (checkCreditCard($.trim(obj.val()), ccType, false)) {
                        $(".creditTypeError").hide();
                        $(".creditError").hide();
                        obj.removeClass("error");
                        obj.prev("label").find(".star").removeClass("star-error");
                        creditCardType = ccType;
                    }
                    else {
                        $(".creditTypeError").hide();
                        $(".creditError").show();
                        obj.addClass("error");
                        obj.prev("label").find(".star").addClass("star-error");
                    }
                }
                else {
                    var namefromCode = {"name": "", "acceptType": false};
                    if (checkCreditCard($.trim(obj.val()), namefromCode, true, AcceptCardType)) {
                        obj.after('<span class="show ok"></span>');
                        creditCardType = namefromCode["name"];
                        $("#acceptedCreditCards li span." + creditCardType).addClass("selected");
                        $(".creditTypeError").hide();
                        $(".creditError").hide();
                        obj.removeClass("error");
                        obj.prev("label").find(".star").removeClass("star-error");
                    }
                    else {
                        if (namefromCode["name"] != "" && namefromCode["acceptType"] == false) {
                            $(".creditTypeError").show();
                            $(".creditTypeError .errorCCType").html(namefromCode["name"].replace("_", " "));
                            $(".creditError").hide();
                        }
                        else {
                            $(".creditTypeError").hide();
                            $(".creditError").show();
                        }
                        obj.after('<span class="show error"></span>');
                        obj.addClass("error");
                        obj.prev("label").find(".star").addClass("star-error");
                    }
                }
            }
        });
        if ($("#securityCodeArea").is(":visible")) {
            $("#ccCVC").each(function () {
                var obj = $(this);
                obj.parent().next("span.show").remove();
                if ($.trim(obj.val()) == "") {
                    obj.parent().after('<span class="show error"></span>');
                    obj.addClass("error");
                    obj.prev("label").find(".star").addClass("star-error");
                }
                else {
                    var cvcexp = /^[0-9]{3,4}$/;
                    if (!cvcexp.exec($.trim(obj.val()))) {
                        obj.parent().after('<span class="show error"></span>');
                        obj.addClass("error");
                        obj.prev("label").find(".star").addClass("star-error");
                    }
                    else {
                        obj.parent().after('<span class="show ok"></span>');
                        obj.removeClass("error");
                        obj.prev("label").find(".star").removeClass("star-error");
                    }
                }
            });
        }
        checkExpirations();
    }
    if ($(".reservation-form span.error").length > 0) {
        openWarning(LocalizeKey(lang, "be_error_invalid_fields").replace("{$0$}", $(".reservation-form span.error").length));
        return false;
    }
    else if (!$("#acceptTerms").prop('checked')) {
        openWarning(LocalizeKey(lang, "be_make_sure_Terms_conditions"));
        return false;
    }
    else {
        $("#summaryPage .book-now").addClass("disabled-btn");

        var firstName = $("#firstname").val();
        var lastName = $("#lastname").val();
        var email = $("#resvemail").val();
        var phone = $("#phone").val();
        var address1 = $("#address1").val();
        var address2 = $("#address2").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var country = $("#country").val();
        var postalCode = $("#zipcode").val();
        //var ContactMeThrough = $(".radioemail:checked").val();
        specialRequest = $.trim($("#specialrequest").val());
        if (specialRequest == "") {
            specialRequest = LocalizeKey(lang, "be_none");
        }
        //---
        var billingAddress1 = "";
        var billingAddress2 = "";
        var billingCity = "";
        var billingState = "";
        var billingCountry = "";
        var billingPostalCode = "";
        var billingPhone = "";
        //CreditCard
        var creditCardNumber = "";
        var expirationMonth = "";
        var expirationYear = "";
        var securityCode = "";
        var nameOnCard = "";
        if ($(".creditCardInfo").is(":visible")) {
            creditCardNumber = $("#ccNumber").val().replace(/\s/g, "");
            if ($("#ccExpiration").length > 0) {
                var expirationVals = $("#ccExpiration").val().split("/");
                expirationMonth = expirationVals[0];
                expirationYear = expirationVals[1];
            }
            else {
                expirationMonth = $("#ccMonth").val();
                expirationYear = $("#ccYear").val();
            }
            if ($("#securityCodeArea").is(":visible"))
                securityCode = $.trim($("#ccCVC").val());
            nameOnCard = $.trim($("#ccName").val());
        }

        var postData = {
            "key": key,
            "hotelId": hotelid,
            "format": "json",
            "lang": lang,
            "cartId": cartId,

            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "address1": address1,
            "address2": address2,
            "city": city,
            "state": state,
            "country": country,
            "postalCode": postalCode,
            "specialRequest": specialRequest,

            "billingAddress1": billingAddress1,
            "billingAddress2": billingAddress2,
            "billingCity": billingCity,
            "billingState": billingCity,
            "billingCountry": billingCountry,
            "billingPostalCode": billingPostalCode,
            "billingPhone": billingPhone
        };
        if ($(".creditCardInfo").is(":visible")) {
            var creditData = {
                "creditCardType": creditCardType,
                "creditCardNumber": creditCardNumber,
                "expirationMonth": expirationMonth,
                "expirationYear": expirationYear,
                "nameOnCard": nameOnCard
            };
            postData = $.extend(postData, creditData);
            if ($("#securityCodeArea").is(":visible")) {
                var securityData = {
                    "securityCode": securityCode
                };
                postData = $.extend(postData, securityData);
            }
        }
        //var loadingImg = $("#loadingImg");
        //loadingImg.show();
        //SetPosition(loadingImg);
        piwikTracker.trackGoal(5);  // Track Book Now
        var posturl = "/beapi/rest/cart/purchase";
        AjaxPost("post", posturl, postData, function (data) {
            if (data.status == "success") {
                //$("#successPannel").show();
                //$("#reservationPannel").hide();
                //$("#i_cartPannel").hide();
                //setSuccessPannel(data);
                (function () {
                    var cp = document.createElement('script');
                    cp.type = 'text/javascript';
                    cp.async = true;
                    var src = ('https:' == document.location.protocol ? 'https://' : 'http://') + campaignDomain + '/cpapi/track.js?';
                    src += 'domain=' + domain + '&event=3';
                    cp.src = src;
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(cp, s);
                })();
                try {
                    var totalPrice = parseInt(data.totalCartPriceAfterTax.replace(",", ""));
                    _gaq.push(
                        ['_setAccount', 'UA-20758296-1'],
                        ['_trackEvent', 'Booking Engine', 'Reservation Made', 'ID:' + hotelid + ' | Domain:' + domain + ' | Status:Success' + ' | Currency:' + currencySymbol + ' | Channel:' + channel + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                    if (gaCode != "") {
                        _gaq.push(
                            ['_setAccount', gaCode],
                            ['_trackEvent', 'Booking Engine', 'Reservation Made', 'ID:' + hotelid + ' | Domain:' + domain + ' | Status:Success' + ' | Currency:' + currencySymbol + ' | Channel:' + channel + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                    }
                    piwikTracker.trackPageView('/Reservation_Made?Status=Success&Currency=' + currencySymbol + '&Channel=' + channel + '&Value=' + totalPrice.toString() + mobileBE2);
                } catch (err) {
                }
                try {
                    initPiwik();
                    var totalPrice = setPiwikCart(currentCart);
                    var subtotal = parseInt(data.totalPrice.replace(",", ""));
                    var tax = parseInt(data.tax.replace(",", ""));
                    piwikTracker.trackEcommerceOrder(data.reservationId, totalPrice, subtotal, tax);
                } catch (err) {
                }
                try {
                    var cartItems = currentCart.cartItems;
                    $.each(cartItems, function (i, n) {
                        var itemType = n.itemType;
                        if (itemType == "room") {
                            var obj = n.roomChoiceItem;
                            var roomType = obj.roomType;
                            var roomRate = obj.rateDisplayName;
                            var totalPrice = parseInt(obj.totalPriceAfterTax.replace(",", ""));
                            var numNights = obj.perNightRateNotes.length
                            var quantity = n.quantity;
                            for (i = 0; i < quantity; i++) {
                                try {
                                    _gaq.push(
                                        ['_setAccount', 'UA-20758296-1'],
                                        ['_trackEvent', 'Booking Engine', 'Room Reserved', 'ID:' + hotelid + ' | Domain:' + domain + ' | Room:' + roomType + ' | Rate:' + roomRate + ' | Nights:' + numNights + ' | Currency:' + currencySymbol + ' | Quantity: 1' + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                                    if (gaCode != "") {
                                        _gaq.push(
                                            ['_setAccount', gaCode],
                                            ['_trackEvent', 'Booking Engine', 'Room Reserved', 'ID:' + hotelid + ' | Domain:' + domain + ' | Room:' + roomType + ' | Rate:' + roomRate + ' | Nights:' + numNights + ' | Currency:' + currencySymbol + ' | Quantity: 1' + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                                    }
                                } catch (err) {
                                }
                            }
                            piwikTracker.trackPageView('/Room_Reserved?Room=' + roomType + '&Rate=' + roomRate + '&Nights=' + numNights + '&Currency=' + currencySymbol + '&Quantity=' + quantity.toString() + '&Value=' + (totalPrice * quantity).toString() + mobileBE2);
                        } else if (itemType == "package") {
                            var obj = n.packageChoiceItem;
                            var packageName = obj.packageName;
                            var totalPrice = parseInt(obj.totalPriceAfterTax.replace(",", ""));
                            var quantity = n.quantity;
                            for (i = 0; i < quantity; i++) {
                                try {
                                    _gaq.push(
                                        ['_setAccount', 'UA-20758296-1'],
                                        ['_trackEvent', 'Booking Engine', 'Package Reserved', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + packageName + ' | Currency:' + currencySymbol + ' | Quantity: 1' + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                                    if (gaCode != "") {
                                        _gaq.push(
                                            ['_setAccount', gaCode],
                                            ['_trackEvent', 'Booking Engine', 'Package Reserved', 'ID:' + hotelid + ' | Domain:' + domain + ' | Package:' + packageName + ' | Currency:' + currencySymbol + ' | Quantity: 1' + ' | Medium:' + medium + ' | Source:' + source + mobileBE, totalPrice]);
                                    }
                                } catch (err) {
                                }
                            }
                            piwikTracker.trackPageView('/Package_Reserved?Package=' + package + '&Currency=' + currencySymbol + '&Quantity=' + quantity.toString() + '&Value=' + (totalPrice * quantity).toString() + mobileBE2);
                        }
                    });
                } catch (err) {
                }
                revenue = parseFloat(data.totalCartPriceAfterTax.replace(",", ""));
                successfulBooking(data.reservationId);
                piwikTracker.trackGoal(6);  // Track Confirmation
                $("#ccNumber").val("");
                $("#ccCVC").val("");
            }
            else {
                openReservationErr(data.message, data.code);
            }
            $("#summaryPage .book-now").removeClass("disabled-btn");
        });
    }
}

/*--------------------------------------------------
 :: Cart Functions
 --------------------------------------------------*/
function setCart(data) {
    clearCart();

    if (cartId == "") {
        cartId = data.cartId;
        setCartId();
    }
    if (data.cartItems.length <= 0) {
        currentCart = null;
    }
    else {
        currentCart = data;
    }
    setCartItems();
}

function clearCart() {
    isRoomInCart = false;
    currentCart = null;
}

function clearcartData() {
    var postData = {
        "key": key,
        "hotelId": hotelid,
        "format": "json",
        "lang": lang,
        "cartId": cartId
    };
    var posturl = "/beapi/rest/cart/clear";
    AjaxPost("post", posturl, postData, function (data) {
        if (data.status == "error") {
            //??????????
            OpenError(data.message);
        }
        else {
            setCart(data);
        }
    });
}

function list(backCall) {
    if (cartId != "") {
        var postData = {
            "key": key,
            "hotelId": hotelid,
            "format": "json",
            "lang": lang,
            "cartId": cartId
        };
        var posturl = "/beapi/rest/cart/list";
        AjaxPost("post", posturl, postData, function (data) {
            if (data.status == "error") {
                OpenError(data.message);
            }
            else {
                setCart(data);
                if (backCall) backCall();
            }
        });
    }
}

/*--------------------------------------------------
 :: Validation Functions
 --------------------------------------------------*/
function validateEmail(email) {
    return email.search(/^(?:(?:[\\\-+!#$&*?^`{|}~%=_'a-zA-Z0-9]+)(?:\.(?![\.@]))?)+@(?:[a-z0-9\-]+\.)+[a-z]+/);
}

function validatePhonenumber(phone) {
    /**
     * DHTML phone number validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
     */
    var digits = "0123456789";
    var phoneNumberDelimiters = "()- ";
    var validWorldPhoneChars = phoneNumberDelimiters + "+";
    var minDigitsInIPhoneNumber = 5;

    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }

    function trim(s) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (c != " ") returnString += c;
        }
        return returnString;
    }

    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }

    function checkInternationalPhone(strPhone) {
        var bracket = 3
        strPhone = trim(strPhone)
        if (strPhone.indexOf("+") > 1) return false
        if (strPhone.indexOf("-") != -1) bracket = bracket + 1
        if (strPhone.indexOf("(") != -1 && strPhone.indexOf("(") > bracket) return false
        if (strPhone.indexOf("(") != -1 && strPhone.indexOf(")") == -1) return false
        if (strPhone.indexOf("(") == -1 && strPhone.indexOf(")") != -1) return false
        s = stripCharsInBag(strPhone, validWorldPhoneChars);
        return (isInteger(s) && s.length >= minDigitsInIPhoneNumber);
    }

    if (phone == null || phone == "") {
        return false;
    }
    if (checkInternationalPhone(phone) == false) {
        return false;
    }
    return true;
}

function checkCreditCard(cardnumber, cardname, unCheckName, acceptCardType) {
    var cards = new Array();

    // Define the cards we support. You may add addtional card types as follows.
    //  Name:         As in the selection box of the form - must be same as user's
    //  Length:       List of possible valid lengths of the card number for the card
    //  prefixes:     List of possible prefixes for the card
    //  checkdigit:   Boolean to say whether there is a check digit

    cards[0] = {
        name: "Visa",
        length: "13,16",
        prefixes: "4",
        checkdigit: true
    };
    cards[1] = {
        name: "MasterCard",
        length: "16",
        prefixes: "51,52,53,54,55",
        checkdigit: true
    };
    cards[2] = {
        name: "American Express",
        length: "15",
        prefixes: "34,37",
        checkdigit: true
    };
    cards[3] = {
        name: "Discover",
        length: "16",
        prefixes: "6011,622,64,65",
        checkdigit: true
    };
    cards[4] = {
        name: "Diners Club",
        length: "14",
        prefixes: "300,301,302,303,304,305,36,38",
        checkdigit: true
    };
    cards[5] = {
        name: "JCB",
        length: "16",
        prefixes: "35",
        checkdigit: true
    };
    cards[6] = {
        name: "银联",
        length: "16",
        prefixes: "62",
        checkdigit: true
    };
    // Establish card type
    var cardType = -1;
    if (!unCheckName) {
        for (var i = 0; i < cards.length; i++) {
            if (cardname.toLowerCase() == cards[i].name.toLowerCase()) {
                cardType = i;
                break;
            }
        }
    }
    else {
        var blnFindType = false;
        for (var i = 0; i < cards.length; i++) {
            var cardPrefix = cards[i].prefixes.split(",");
            for (var j = 0; j < cardPrefix.length; j++) {
                var exp = new RegExp("^" + cardPrefix[j]);
                if (exp.test(cardnumber)) {
                    blnFindType = true;
                    break;
                }
            }
            if (blnFindType) {
                cardType = i;
                cardname["name"] = cards[i].name;
                break;
            }
        }
        var blnCardType = false;
        for (var i = 0; i < acceptCardType.length; i++) {
            var support = acceptCardType[i].replace("_", " ");
            if (cardname["name"].toLowerCase() == support.toLowerCase()) {
                blnCardType = true;
                cardname["acceptType"] = true;
                cardname["name"] = acceptCardType[i];
                break;
            }
        }
        if (blnCardType == false) {
            cardname["acceptType"] = false;
            return false;
        }
    }
    // If card type not found, report an error
    //If use bookingcenter, the others card type doesn't need to check
    if (cardType == -1) {
        if (reservationVendor == BookingCenterName) {
            return true;
        }
        else {
            return false;
        }
    }
    // Ensure that the user has provided a credit card number
    if (cardnumber.length == 0) {
        return false;
    }

    // Now remove any spaces from the credit card number
    cardnumber = cardnumber.replace(/\s/g, "");
    // Check that the number is numeric
    var cardNo = cardnumber
    var cardexp = /^[0-9]{13,19}$/;
    if (!cardexp.exec(cardNo)) {
        return false;
    }

    // Now check the modulus 10 check digit - if required
    if (cards[cardType].checkdigit) {
        var checksum = 0; // running checksum total
        var mychar = ""; // next char to process
        var j = 1; // takes value of 1 or 2
        // Process each digit one by one starting at the right
        var calc;
        for (i = cardNo.length - 1; i >= 0; i--) {
            // Extract the next digit and multiply by 1 or 2 on alternative digits.
            calc = Number(cardNo.charAt(i)) * j;
            // If the result is in two digits add 1 to the checksum total
            if (calc > 9) {
                checksum = checksum + 1;
                calc = calc - 10;
            }
            // Add the units element to the checksum total
            checksum = checksum + calc;
            // Switch the value of j
            if (j == 1) {
                j = 2
            } else {
                j = 1
            }
            ;
        }

        // All done - if checksum is divisible by 10, it is a valid modulus 10.
        // If not, report an error.
        if (checksum % 10 != 0) {
            return false;
        }
    }

    var LengthValid = false;
    var PrefixValid = false;
    var prefix = new Array();
    var lengths = new Array();
    prefix = cards[cardType].prefixes.split(",");
    for (i = 0; i < prefix.length; i++) {
        var exp = new RegExp("^" + prefix[i]);
        if (exp.test(cardNo)) PrefixValid = true;
    }
    if (!PrefixValid) {
        return false;
    }
    lengths = cards[cardType].length.split(",");
    for (j = 0; j < lengths.length; j++) {
        if (cardNo.length == lengths[j]) LengthValid = true;
    }
    if (!LengthValid) {
        return false;
    }
    ;

    return true;
}

/*--------------------------------------------------
 :: Utility Functions
 --------------------------------------------------*/
function localizeSpan(key) {
    return '<span class="localize" key="' + key + '">' + LocalizeKey(lang, key) + '</span>';
}
function localizeSingPlural(key, num) {
    if (num != 1) {
        if (key == "be_child") key = "be_children";
        else key += "s";
    }
    return localizeSpan(key);
}
function dateAddDays(curr, num) {
    var obj = new Date(curr), c = obj.getDate();
    obj.setDate(c + num);
    return obj;
}
function dayDifference(first, second) {
    var fDate = Date.UTC(first.getFullYear(), first.getMonth(), first.getDate(), 0, 0, 0);
    var sDate = Date.UTC(second.getFullYear(), second.getMonth(), second.getDate(), 0, 0, 0);
    return parseInt(Math.abs((fDate - sDate) / (24 * 60 * 60 * 1000)), 10);
}
function stringToDate(date) {
    var parsed = date.split('/');
    if (parsed.length == 3)
        date = new Date(parsed[2], parsed[0] - 1, parsed[1]);
    return date;
}
function dateToString(date) {
    var month = monthNamesShort[date.getMonth()];
    var day = date.getDate();
    return "<span class='localize' key='" + month + "'>" + LocalizeKey(lang, month) + "</span> " + (day <= 9 ? '0' + day : day) + ", " + date.getFullYear();
}
function dateToDisplayAbbr(date) {
    var parsed = date.split('/');
    var month = monthNamesShort[parseFloat(parsed[0]) - 1];
    if (parsed.length == 3) {
        return "<span class='localize' key='" + month + "'>" + LocalizeKey(lang, month) + "</span> " + parsed[1] + ", " + parsed[2];
    }
    return date;
}
function getJsonDate(JsonDate) {
    var current = new Date();
    current.setFullYear(JsonDate.year, JsonDate.month - 1, JsonDate.dayOfMonth);
    return current;
}
function guestsToDisplay(numadults, numchildren) {
    var disp = "";
    disp += numadults + " " + localizeSingPlural("be_adult", numadults) + ", ";
    disp += numchildren + " " + localizeSingPlural("be_child", numchildren);
    return disp;
}
function multiGuestsToDisplay() {
    var disp = "";
    for (var i = 0; i < queryData.roomsData.length; i++) {
        if (i != 0) disp += ", ";
        disp += localizeSpan("be_room") + " " + (i + 1) + " (" + guestsToDisplay(queryData.roomsData[i].numadults, queryData.roomsData[i].numchildren) + ")";
    }
    return disp;
}
function getRoomImg(room, w, h) {
    var img = "";
    if (room.slideshowimages != undefined)
        img = room.slideshowimages[0];
    if (img != "") {
        img = getImgBySize(room.slideshowimages[0], w, h);
        img = img.replace(/http:\/\/[^\/]+/, cdnImageServer);
    }
    else {
        if (w == 618) {
            img = "images/defaultimages/default.jpg.670x335.jpg";
        }
        else {
            img = "images/defaultimages/default.jpg." + w + "x" + h + ".jpg";
        }
    }
    return img;
}
function getImgBySize(img, w, h) {
    return img.replace(/(\.[0-9]+x[0-9]+|)\.(([a-zA-Z]*?)(\?[^\$]*?|))$/gi, function (str) {
        var reg = new RegExp("[0-9]+x[0-9]+", "gi");
        if (reg.test(str)) {
            if (w == undefined && h == undefined) {
                return removeImageVer(str.replace(/([0-9]+x[0-9]+)/gi, "$1" + "_default"));
            }
            else {
                return removeImageVer(str.replace(/[0-9]+x[0-9]+/gi, w + "x" + h + "_default"));
            }
        }
        else {
            if (w == undefined && h == undefined) {
                return str;
            } else {
                return removeImageVer(str.replace(/\.([a-zA-Z]*?)(\?[^\$]*?|)$/gi, ".$1." + w + "x" + h + "_default" + ".$1$2"));
            }
        }
    });
}
function sortBySortID(rooms) {
    return rooms.sort(compareSortID);
}
function compareSortID(room1, room2) {
    var sortID1 = parseInt(room1.sortID, 10);
    var sortID2 = parseInt(room2.sortID, 10);
    return (sortID1 == sortID2) ? 0 : ((sortID1 > sortID2) ? 1 : -1);
}
function sortClientCountry() {
    if (clientCountry != "") {
        var beClientCountry = "be_" + clientCountry.split(" ").join("_");
        var index = $.inArray(beClientCountry, CountryNames);
        if (index == -1) return;
        CountryNames.splice(index, 1);
        CountryNames.splice(0, 0, beClientCountry);
    }
}
function setCountryList() {
    var countryMenu = $("#country");
    if (countryMenu.find("option").length == 0 || countryMenu.attr("lang") != lang) {
        sortClientCountry();
        countryMenu.attr("lang", lang);
        countryMenu.empty().append("<option value=''>" + localizeSpan("be_country") + "</option>");
        $(".countryDiv .ui-btn-text").html(localizeSpan("be_country"));
        $.each(CountryNames, function (i, n) {
            countryMenu.append("<option>" + LocalizeKey(lang, n) + "</option>");
        });
    }
}

/*--------------------------------------------------
 :: Error Helper Functions
 --------------------------------------------------*/
function OpenWaring(Msg, callBack, callBack1) {
    OpenError(Msg);
    /*
     var pannel = $("#WarningPannel");
     pannel.show();

     SetPosition(pannel);
     pannel.find(".warningcon").html("");
     pannel.find(".warningcon").html(Msg);
     MakeDiv();
     pannel.find(".proceed").click(function() {
     if (callBack)
     callBack();
     });
     pannel.find(".close").click(function() {
     if (callBack1)
     callBack1();
     });
     */
}
function OpenAddRoomWaring(Msg, callBack) {
    OpenError(Msg);
    /*
     var pannel = $("#AddRoomWarningPannel");
     pannel.show();

     SetPosition(pannel);
     pannel.find(".message").html("");
     pannel.find(".message").html(Msg);
     MakeDiv();
     pannel.find(".ok").click(function() {
     if (callBack)
     callBack();
     });
     */
}
function OpenErrorTimeOut(Msg, callBack) {
    OpenError(Msg);
    /*
     var pannel = $("#errorPannel");
     pannel.show();

     SetPosition(pannel);
     pannel.find(".warningcon").html("");
     pannel.find(".warningcon").html(Msg);
     pannel.find(".close").click(function() {
     if (callBack)
     callBack();
     });
     MakeDiv();
     return false;
     */
}
function openReservationErr(msg, errorCode) {
    if (errorCode == "BK-CreditCardExpiryDateInvalid" || errorCode == "BK-CreditCardInvalidType") {
        openWarning(msg);
    }
    else {
        OpenError(msg);
    }
    /*
     var pannel = $("#ReservationErrPannel");
     pannel.show();

     SetPosition(pannel);
     pannel.find(".expline").html("");
     pannel.find(".expline").html(msg);
     pannel.find(".fbottom .canleft").unbind("click", returnBack);
     if (errorCode.toLowerCase() == "RS-RoomDateNotAvailable".toLowerCase())
     {
     pannel.find(".fbottom .canleft").bind("click", returnBack);
     }
     MakeDiv();
     return false;
     */
}
// Limit the number of plug-ins entered
$.fn.numeral = function (inputZeroFlag) {
    $(this).css("ime-mode", "disabled");
    this.bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which); // Compatible with Firefox IE 
        if (!$.browser.msie && (e.keyCode == 0x8))    // Firefox can not use backspace
        {
            return;
        }
        if (code == 9) return true;
        return code >= 48 && code <= 57;
    });
    this.bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = "";
        }
    });
    this.bind("paste", function () {
        var s = clipboardData.getData('text');
        if (!/\D/.test(s));
        this.value = this.value + s.replace(/^0*/, '');
        return false;
    });
    this.bind("dragenter", function () {
        return false;
    });
    this.bind("keyup", function () {
        if (inputZeroFlag) {
            if (/(^0[0-9]+)/.test(this.value)) {
                this.value = this.value.replace(/^0*/, '');
            }
        }
        else {
            if (/(^0+)/.test(this.value)) {
                this.value = this.value.replace(/^0*/, '');
            }
        }
    });
};
function numberToggleClick() {
    var input = $(this).siblings("input");
    var value = parseInt(input.val());
    var maxVal = input.attr("maxval");
    var minVal = input.attr("minval");
    if ($(this).hasClass("subtract")) {
        if (minVal === undefined || (minVal !== undefined && value > parseInt(minVal))) {
            if (value > 0) {
                input.val(value - 1);
            }
        }
    } else {
        if (maxVal === undefined || (maxVal !== undefined && value < parseInt(maxVal))) {
            input.val(value + 1);
        }
    }
    input.trigger("change");
}
function checkMaxMin() {
    var maxVal = $(this).attr("maxval");
    var minVal = $(this).attr("minval");
    if (maxVal !== undefined && parseInt($(this).val()) > parseInt(maxVal)) {
        $(this).val(maxVal);
    }
    if (minVal !== undefined && parseInt($(this).val()) < parseInt(minVal)) {
        $(this).val(minVal);
    }
    if (!parseInt($(this).val())) {
        $(this).val(minVal);
    }
}

jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

function base64_decode(data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];
    if (!data) {
        return data;
    }
    data += '';
    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    return dec;
}
// If this element has a background-image test if the image loads correctly. If it
// does not, apply fallback class so it can use its backup image location
function checkFixBackgroundImage(selector) {
    var cdnImage = $(selector).css("background-image");
    if (cdnImage != undefined) {
        cdnImage = cdnImage.replace(/"/g, "")
        if (cdnImage.substring(0, 3) == "url") {
            cdnImage = cdnImage.substring(4, cdnImage.length - 1);
            var testImage = new Image();
            testImage.onerror = function () {
                $(selector).addClass("image-fallback");
            };
            testImage.src = cdnImage;
        }
    }
}

function setPiwikCart(data) {
    var cartItems = data.cartItems;
    $.each(cartItems, function (i, n) {
        var itemType = n.itemType;
        var quantity = n.quantity;
        if (itemType == "room") {
            var obj = n.roomChoiceItem;
            piwikTracker.addEcommerceItem(n.ID, obj.roomType, ["Room", currencySymbol, obj.roomTypeCategory, obj.rateDisplayName, mobileBE3], parseInt(obj.totalPriceAfterTax.replace(",", "")) * quantity, quantity);
        } else if (itemType == "package") {
            var obj = n.packageChoiceItem;
            piwikTracker.addEcommerceItem(n.ID, obj.packageName, ["Package", currencySymbol, mobileBE3], parseInt(obj.totalPriceAfterTax.replace(",", "")) * quantity, quantity);
        }
    });
    var totalPrice = parseInt(data.totalCartPriceAfterTax.replace(",", ""));
    return totalPrice;
}
function imageError(image) {
    var url = $(image).attr('src');
    url = url.replace(cdnImageServer, imgServer);
    $(image).css("visibility", "hidden");
    $(image).load(function () {
        $(image).css({"visibility": "visible"});
    });
    $(image).unbind("error");
    $(image).attr("src", url);
}
function removeImageVer(url) {
    url = url.replace(/(\?(ver|ran)=[^\s]*?)$/gi, "");
    return url;
}