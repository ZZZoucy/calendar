let currentTime = new Date();
render(currentTime);

get("#prevMonth").onclick = () => {
    render(new Date(currentTime - 86400 * 1000 * 30));
};
get("#nextMonth").onclick = () => {
    render(new Date(currentTime - 0 + 86400 * 1000 * 30));
};
get("#today ").onclick = () => {
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
        // 每个月1号之前的铺垫
        for (let i = 1; i < firstDayWeek; i++) {
            const li = document.createElement("li");
            const d = new Date(firstDay - 86400 * 1000 * i);
            li.textContent = d.getDate();
            days.prepend(li);
        }

        // 每个月1号从星期几开始
        const daysCount = lastDayDate;
        for (let i = 1; i <= daysCount; i++) {
            const li = document.createElement("li");
            li.textContent = i;
            days.append(li);
        }

        // 每个月最后一天之后的铺垫
        for (let i = lastDayWeek + 1; i <= 7; i++) {
            const delta = i - lastDayWeek;
            const li = document.createElement("li");
            const d = new Date(lastDay - 0 + 86400 * 1000 * delta);
            li.textContent = d.getDate();
            days.append(li);
        }
    }
}
function get(selector) {
    return document.querySelector(selector);
}
function getAll(selector) {
    return document.querySelectorAll(selector);
}
