function getThisTime() {
	var dates = []

	function formatDate(date) {
		//var year = date.getFullYear() + '年';
		var month = (date.getMonth() + 1) + '月';
		var day = date.getDate() + '日';

		return month + day;
	}

	function addDate(date, n) {
		date.setDate(date.getDate() + n);
		return date;
	}

	function setDate(date) {
		dates = [];
		var week = date.getDay() - 1;
		date = addDate(date, week * -1);
		var currentFirstDate = new Date(date);

		for(var i = 0; i < 7; i++) {
			dates.push(formatDate(i == 0 ? date : addDate(date, 1)));
		}
		return dates;
	}

	return setDate(new Date())
}

function getDateWeek() {
	var todayDate = new Date();
	var date = todayDate.getDate();
	var month = todayDate.getMonth() + 1;
	var dateweek = "";
	if(navigator.appName == "Netscape") {
		dateweek = month + "月" + date + "日";
	}
	if(navigator.appVersion.indexOf("MSIE") != -1) {
		dateweek = month + "月" + date + "日";
	}

	return dateweek;
}
function getLong(data){
	return new Date(data.replace(new RegExp(["年","月","日"],"gm"),"/")).getTime() 
}
function getDateWeek2() {
	var todayDate = new Date();
	var year = todayDate.getYear()
	var date = todayDate.getDate();
	var month = todayDate.getMonth() + 1;
	var dateweek = "";
	if(navigator.appName == "Netscape") {
		dateweek = dateweek + (1900 + year) + "年" + month + "月" + date + "日";
	}
	if(navigator.appVersion.indexOf("MSIE") != -1) {
		dateweek = dateweek + (1900 + year) + "年" + month + "月" + date + "日";
	}

	return dateweek;
}

function getThisTime2() {
	var dates = []

	function formatDate(date) {
		var year = date.getFullYear() + '年';
		var month = (date.getMonth() + 1) + '月';
		var day = date.getDate() + '日';

		return year + month + day;
	}

	function addDate(date, n) {
		date.setDate(date.getDate() + n);
		return date;
	}

	function setDate(date) {
		dates = [];
		var week = date.getDay() - 1;
		date = addDate(date, week * -1);
		var currentFirstDate = new Date(date);

		for(var i = 0; i < 7; i++) {
			dates.push(formatDate(i == 0 ? date : addDate(date, 1)));
		}
		return dates;
	}

	return setDate(new Date())
}
function getThisTime3() {
	var dates = []

	function formatDate(date) {
		var year = date.getFullYear() + '-';
		var month = (date.getMonth() + 1) + '-';
		var day = date.getDate();
	
		return year + month + day;
	}

	function addDate(date, n) {
		date.setDate(date.getDate() + n);
		return date;
	}

	function setDate(date) {
		dates = [];
		var week = date.getDay() - 1;
		date = addDate(date, week * -1);
		var currentFirstDate = new Date(date);

		for(var i = 0; i < 7; i++) {
			dates.push(formatDate(i == 0 ? date : addDate(date, 1)));
		}
		return dates;
	}

	return setDate(new Date())
}
function getYYMMDD() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr
}
function everyYYMMDD(data) {
	var nowDate = new Date(data);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr
}
function getTimes(data) {
	var nowDate = new Date(data);
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
	var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
	var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
	var minute  = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
	var second  = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
	var dateStr = year + "年" + month + "月" + day + "日" +"" + hour + ":" + minute + ":" +second;
	return dateStr
}

function addDate(date, days) {
	var d = new Date(date);
	d.setDate(d.getDate() + days);
	var month = d.getMonth() + 1;
	var day = d.getDate();
	if(month < 10) {
		month = "0" + month;
	}
	if(day < 10) {
		day = "0" + day;
	}
	var val = d.getFullYear() + "-" + month + "-" + day;
	return val;
}

export {
	getThisTime,
	getDateWeek,
	getDateWeek2,
	getThisTime2,
	getYYMMDD,
	addDate,
	getTimes,
	everyYYMMDD,
	getLong,
	getThisTime3
}