// js时间戳转化成日期格式
export function timestampToTime (timestamp) {
    const date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
  }
  
  export function formatSeconds (value) {
      // 秒数转化成时间段
      let secondTime = parseInt(value); // 秒
      let minuteTime = 0;// 分
      let hourTime = 0;// 小时
      if (secondTime > 60) {// 如果秒数大于60，将秒数转换成整数
          // 获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60);
          // 获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60);
          // 如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
              // 获取小时，获取分钟除以60，得到整数小时
              hourTime = parseInt(minuteTime / 60);
              // 获取小时后取佘的分，获取分钟除以60取佘的分
              minuteTime = parseInt(minuteTime % 60);
          }
      }
      let s = parseInt(secondTime).toString().length === 2 ? parseInt(secondTime) : (parseInt(secondTime).toString().length === 1 ? '0' + parseInt(secondTime) : '00')
      var result = "" + s;
  
          let min = parseInt(minuteTime).toString().length === 2 ? parseInt(minuteTime) : (parseInt(minuteTime).toString().length === 1 ? '0' + parseInt(minuteTime) : '00')
          result = "" + min + ": " + result;
          
          let h = parseInt(hourTime).toString().length === 2 ? parseInt(hourTime) : (parseInt(hourTime).toString().length === 1 ? '0' + parseInt(hourTime) : '00')
          result = "" + h + ": " + result;
      return result;
  };