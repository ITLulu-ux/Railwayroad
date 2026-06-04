let grid;

document.addEventListener("DOMContentLoaded", () => {
    loadAvailableDates();
    initGrid();

    document.querySelector("#btnSearch")?.addEventListener("click", () => {
        grid.getDataSource().reload();
    });
});


function normalizeDate(value) {
    if (!value) return null;

    if (!isNaN(value)) {
        const d = new Date(Number(value));
        return d.toISOString().slice(0, 10);
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
    }

    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    return value;
}

function loadAvailableDates() {
    const select = document.getElementById("dateFilter");
    if (!select) {
        console.error("select 요소 ID를 찾을 수 없습니다.");
        return;
    }

    fetch('/dates')
        .then(res => res.json())
        .then(list => {
        select.innerHTML="";

        list.forEach(date => {
            const op = document.createElement("option");
            op.value = date;
            op.textContent = date;
            select.appendChild(op);
           });
          })
          .catch(err => console.error("날짜 목록 불러오기 실패", err));
        }

function createDataSource() {
    return new DevExpress.data.CustomStore({
        key: "routeNm",

        load: function (loadOptions) {

        if (loadOptions.filter) {
        console.warn("DevExtreme auto filter removed:", loadOptions.filter);
        loadOptions.filter = null;
        }
            const skip = loadOptions.skip ?? 0;
            const take = loadOptions.take ?? 30;

            const page = skip / take;
            const size = take;

            let dateFilterRaw = document.getElementById("dateFilter")?.value || "";
            const val2 = document.getElementById("val2")?.value || "";
            const val3 = document.getElementById("val3")?.value || "";

            const dateFilter = normalizeDate(dateFilterRaw);

            const params = new URLSearchParams({
                page,
                size,
                dateFilter,
                val2,
                val3
            });

            return fetch(`/list?${params.toString()}`)
                .then(res => res.json())
                .then(data => ({
                    data: data.data,
                    totalCount: data.totalCount
                }))
                .catch(() => ({
                    data: [],
                    totalCount: 0
                }));
        }
    });
}

function initGrid() {
    grid = $("#gridContainer").dxDataGrid({
        dataSource: createDataSource(),
        keyExpr: "id",

        filterRow: {visible: false},
        headerFilter: {visible: false},
        allowHeaderFiltering: false,

        remoteOperations: {
            paging: true,
            sorting: false,
            filtering: false,
            grouping: false
        },

        showBorders: true,
        columnAutoWidth: true,

        paging: {
            pageSize: 10
        },

        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 30],
            showNavigationButtons: true
        },

        columns: [
            { dataField: "logDate", caption: "Log Date" , dateType: "string", format: "yyyy-MM-dd"},
            { dataField: "numberOfGetIn", caption: "승차" },
            { dataField: "numberOfGetOff", caption: "하차" },
            { dataField: "numberOfGetCurrent", caption: "현재 인원" },
            { dataField: "vehicleNm", caption: "차번호" },
            { dataField: "routeNm", caption: "노선명", selectedFilterOperation: "=", filterOperations:["="] }
        ]
    }).dxDataGrid("instance");
}



