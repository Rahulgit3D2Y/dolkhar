/**
 * TripAdvisor library to render pixels (1x1 transparent images) to
 * TripAdvisor servers.
 *
 * These pixels are to be used to track impressions and/or conversions
 * from partner websites.
 */
var TAPixel = function () {
    var protocol = "//";
    var host = "www.tripadvisor.com";
    var refererImpressionAndConversionUrl = protocol + host + "/CommLCT";
    var version = 1;
    var sharedConversionParams = "partner={0}&gdv={1}&currency={2}&tax={3}&fees={4}&start_date={5}&end_date={6}&num_adults={7}&partner_id={8}&order_number={9}&version={10}&remote_host={11}"

    var format = function (formatString) {
        for (var i = 1; i < arguments.length; i++) {
            var stringToReplace = "{" + (i - 1) + "}";
            var value = arguments[i] || "";
            formatString = formatString.replace(stringToReplace, arguments[i]);
        }
        return formatString;
    };

    var referer = function () {
        return document.referrer || "";
    };

    var remoteHost = function () {
        return document.location.hostname || "";
    };

    var addImageToBody = function (urlSrc) {
        var image = document.createElement('img');
        image.setAttribute('src', urlSrc);
        document.body.appendChild(image);
    };

    return {
        impressionWithReferer: function (partnerName) {
            var url = refererImpressionAndConversionUrl + format("?type=impression&partner={0}&referer={1}&version={2}&rr={3}&remote_host={4}",
                    encodeURIComponent(partnerName),
                    encodeURI(referer()),
                    version,
                    new Date().getTime(),
                    encodeURIComponent(remoteHost()));
            addImageToBody(url);
        },
        conversionWithReferer: function (partnerName, partnerId, gdv, currency, tax, fees, startDate, endDate, numAdults, orderNumber) {
            var url = refererImpressionAndConversionUrl + format("?type=referer_conversion&" + sharedConversionParams + "&referer={12}",
                    encodeURIComponent(partnerName),
                    encodeURIComponent(gdv),
                    encodeURIComponent(currency),
                    encodeURIComponent(tax),
                    encodeURIComponent(fees),
                    encodeURIComponent(startDate),
                    encodeURIComponent(endDate),
                    encodeURIComponent(numAdults),
                    encodeURIComponent(partnerId),
                    encodeURIComponent(orderNumber),
                    version,
                    encodeURI(remoteHost()),
                    encodeURI(referer()));
            addImageToBody(url);
        },
        conversionWithCredit: function (partnerName, partnerId, gdv, currency, tax, fees, startDate, endDate, numAdults, orderNumber, credit) {
            var url = refererImpressionAndConversionUrl + format("?type=credit_conversion&" + sharedConversionParams + "&credit={12}",
                    encodeURIComponent(partnerName),
                    encodeURIComponent(gdv),
                    encodeURIComponent(currency),
                    encodeURIComponent(tax),
                    encodeURIComponent(fees),
                    encodeURIComponent(startDate),
                    encodeURIComponent(endDate),
                    encodeURIComponent(numAdults),
                    encodeURIComponent(partnerId),
                    encodeURIComponent(orderNumber),
                    version,
                    encodeURI(remoteHost()),
                    encodeURIComponent(credit));
            addImageToBody(url);
        }
    };
}(); // Call the TAPixel function here to get the return block on script load
