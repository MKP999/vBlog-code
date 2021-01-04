
import { history } from 'umi'
import { message } from "antd"

interface Options {
  name?: any,
  value?: any,
  expires?: string,
  startTime?: string
}

// 设置存储值
export const setStorageFn = (params: object):void => {
  let obj = {
    name: '',
    value: '',
    expires: '', // 毫秒级
    startTime: new Date().getTime(), //记录何时将值存入缓存，毫秒级
  };
  let options:Options = {};
  //将obj和传进来的params合并
  Object.assign(options, obj, params);
  if (options.expires) {
    //如果options.expires设置了的话
    //以options.name为key，options为值放进去
    localStorage.setItem(options.name, JSON.stringify(options));
  } else {
    //如果options.expires没有设置，就判断一下value的类型
    let type = Object.prototype.toString.call(options.value);
    //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
    if (type == '[object Object]' || type == '[object Array]') {
      options.value = JSON.stringify(options.value);
    }
    localStorage.setItem(options.name, options.value);
  }
}

// 获取存储值
export const getStorageFn = (name:string):any => {
  let item:any = localStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (item && item.startTime) {
      let date = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name)
        message.error('登录超时, 请重新登录!')
        history.replace('/login')
        return false;
      } else {
        //缓存未过期，返回值
        return item.value;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item;
    }
}

//移出缓存
export const removeStorageFn = (name: string) => {
  localStorage.removeItem(name);
}