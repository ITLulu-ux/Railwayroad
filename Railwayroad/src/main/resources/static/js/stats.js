let dataCurrent = [];

function getColumnsByType(type) {
    let statCaption = "월별";

    if (type === "daily") statCaption = "일별";
    else if (type === "weekly") statCaption = "주별";

    return [
        {
            dataField: "statDate",
            caption: statCaption,
            dataType: "string",
            format: "yyyy-MM-dd"
        },
        { dataField: "routeNm", caption: "노선명" },
        { dataField: "totalGetIn", caption: "승차" },
        { dataField: "totalGetOff", caption: "하차" },
        { dataField: "netGetIn", caption: "순승차" },
        { dataField: "avgOnBoard", caption: "평균" }
    ];
}

function loadStats() {

    const type = $("#statType").val() || "daily";
    const routeNm = $("#routeType").val();
    const metricKey = $("#chart").val() || "getIn";

    const params = {
        type: type,
        startDate: $("#startDate").val(),
        endDate: $("#endDate").val()
    };

    if (routeNm) {
        params.routeNm = routeNm;
    }

    fetch("/stats?" + new URLSearchParams(params))
        .then(res => res.json())
        .then(data => {
            dataCurrent = data;
            drawChart(dataCurrent, metricKey);
            drawGrid(dataCurrent, type);
        });
}

function drawGrid(data, type) {
    $("#gridStats").dxDataGrid({
        dataSource: data,
        columns: getColumnsByType(type),
        paging: {
            pageSize: 5
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 15],
            showNavigationButtons: true
        },
        showBorders: true
    });
}

function drawChart(data, metricKey = "chart") {
    const metricMap = {
        getIn:  { field: "totalGetIn",  label: "승차 인원(명)" },
        getOff: { field: "totalGetOff", label: "하차 인원(명)" },
        net:    { field: "netGetIn",    label: "순승차 인원(명)" },
        avg:    { field: "avgOnBoard",  label: "평균 인원(명)" }
    };

    const metric = metricMap[metricKey];
    const field = $("#chart").val(); // getIn / getOff / net / avg

    const COLOR_MAP = {
      getIn: "#4e79a7", //파
      getOff: "#e15759", //빨
      net: "#59a14f", //초
      avg: "#f28e2b" //주
    };

    if (!metric) return;

    $("#chartContainer").dxChart({
        dataSource: data,
        commonSeriesSettings: {
            argumentField: "statDate",
            type: "line" //bar //line
        },
        series: [{
            valueField: metric.field,
            name: metric.label,
            color: COLOR_MAP[field]
        }],
        argumentAxis: {
            title: { text: "날짜" }
        },
        valueAxis: {
            min: 0,
            title: { text: metric.label }
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                return { text: `${arg.seriesName}: ${arg.value}` };
            }
        }
    });
}

$("#searchBtn").on("click", function () {
    loadStats();
});

$("#metric").on("click", function () {
    loadStats();
});
