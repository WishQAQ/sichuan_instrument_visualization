import Vue from "vue";

/**
 * @Description: 转换int为string，前补0修改长度为5位  例：00001
 * @author Wish
 * @date 2019/8/9
*/
Vue.prototype.$GetNumberType = (date) =>{
  return date.toString().padStart(5, '0');
};

/**
 * @Description: 滑块距离计算 百分比宽度转rem宽度  例：25% = 0.63rem
 * @author Wish
 * @date 2019/8/13
 */
Vue.prototype.$GetSliderSchedule = (date) =>{
  let schedule;
  let width = parseInt(236);  // 初始化滑块总长度
  let percentage = parseInt(date) / 100;  // 转换百分比为数值
  schedule = width * percentage / 100 + 'rem';

  return schedule;
};

/**
 * @Description: 滑块状态文字颜色切换  例：数值小于等于30%则为正常、如数值大于30%且小于60%则为异常、如数值大于60%则为错误
 * @author Wish
 * @date 2019/8/13
 */
Vue.prototype.$GetSliderStatus = (date) =>{
  let status;
  if(date <= '30%'){
    status = '#28E391'
  } else if(date > '30%' && date < '60%'){
    status = '#E9EA27'
  } else if(date >= '60%'){
    status = '#F7560E'
  }

  return status;
};

/**
 * @Description: 中国标准时间转换
 * @author Wish
 * @date 2019/8/13
*/
Vue.prototype.$GetChangeDate = (date) =>{
  const dateFormatter = (formatter, date) => {
    date = (date ? new Date(date) : new Date)
    const Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds()
    return formatter.replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g, (M < 10 ? '0' : '') + M)
        .replace(/DD/g, (D < 10 ? '0' : '') + D)
        .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
        .replace(/mm/g, (m < 10 ? '0' : '') + m)
        .replace(/ss/g, (s < 10 ? '0' : '') + s)
  };
  return dateFormatter('YYYY-MM-DD HH:mm', date)
};
