window.alert("建议使用手机端打开");
let currentTime = new Date();
render(currentTime);

get("#prevMonth").onclick = () => {
    // 上个月 = 这个月月初 - 1天
    const firstDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1);
    render(new Date(firstDay - 86400 * 1000));
};
get("#nextMonth").onclick = () => {
    const nextMonthFirstDay = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1);
    render(nextMonthFirstDay);
};
get("#today").onclick = () => {
    render(new Date());
};

// 帮助函数
function render(time) {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    initTime();
    generateDays();
    currentTime = time;

    // 帮助函数
    // 初始化time
    function initTime() {
        const time = get("#time");
        time.textContent = `${year}年${month}月`;
    }

    // 初始化days
    /*
        月初: firstDay
        月末: lastDay
        月初星期几: firstDayWeek
        月末星期几: lastDayWeek
        这个月多少天: daysCount
        月末几号: lastDayDate
    */
    function generateDays() {
        const firstDay = new Date(year, month - 1, 1);
        const firstDayWeek = firstDay.getDay();
        const lastDay = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000);
        const lastDayDate = lastDay.getDate();
        const lastDayWeek = lastDay.getDay();
        const days = get("#days");
        days.innerHTML = "";
        const fragment = document.createDocumentFragment();
        let n = 0;

        // 每个月1号之前的铺垫
        for (let i = 1; i < firstDayWeek; i++) {
            const li = document.createElement("li");
            const d = new Date(firstDay - 86400 * 1000 * i);
            li.textContent = d.getDate();
            li.classList.add("calendar-days-disabled");
            fragment.prepend(li);
            n += 1;
        }

        // 每个月1号从星期几开始
        const daysCount = lastDayDate;
        const now = new Date();
        let selectedLi;
        for (let i = 1; i <= daysCount; i++) {
            const li = document.createElement("li");
            li.textContent = i;
            // 给 今天 加一个选中样式
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add("calendar-days-today");
            }
            // 选中某一天，就加个边框样式
            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calendar-days-selected");
                }
                li.classList.add("calendar-days-selected");
                selectedLi = li;
                if (events) {
                    const fragment = document.createDocumentFragment();
                    events.map((event) => {
                        const div = document.createElement("div");
                        div.classList.add("events-item");
                        div.textContent = event;
                        fragment.append(div);
                    });
                    get("#events").innerHTML = "";
                    get("#events").append(fragment);
                } else {
                    get("#events").innerHTML = "<div>没有日程</div>";
                }
            };
            const key = `${year}-${month}-${i}`;
            const events = window.data[key];
            if (events) {
                li.classList.add("calendar-days-hasEvents");
            }
            fragment.append(li);
            n += 1;
        }

        // 每个月最后一天之后的铺垫
        let i = lastDayWeek + 1;
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - lastDayWeek;
            const li = document.createElement("li");
            const d = new Date(lastDay - 0 + 86400 * 1000 * delta);
            li.textContent = d.getDate();
            fragment.append(li);
            li.classList.add("calendar-days-disabled");
            i++;
        }
        days.append(fragment);
    }
}
function get(selector) {
    return document.querySelector(selector);
}
function getAll(selector) {
    return document.querySelectorAll(selector);
}
