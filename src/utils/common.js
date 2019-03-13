 function GetActivityTypeFormat(typeId) {
   //   0：所有用户；1：未注册登录；2：已注册但是没有购买首单；3：已完成首单非VIP用户；4：VIP用户；5：注册有礼
   var val = ""
   switch (typeId) {
     case 0:
       val = "所有用户"
       break
     case 1:
       val = "未注册登录"
       break
     case 2:
       val = "已注册但是没有购买首单"
       break
     case 3:
       val = "已完成首单非VIP用户"
       break
     case 4:
       val = "VIP用户"
       break
     case 5:
       val = "注册有礼"
       break;
     default:
       break
   }

   return val
 }

 export {
   GetActivityTypeFormat
 }
