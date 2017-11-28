import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

// for (let i = 0; i < 86; i++) {
//   Users.push(Mock.mock({
//     id: Mock.Random.guid(),
//     name: Mock.Random.cname(),
//     addr: Mock.mock('@county(true)'),
//     'age|18-60': 1,
//     birth: Mock.Random.date(),
//     sex: Mock.Random.integer(0, 1)
//   }));
// }

for(let i = 0; i < 98; i++){
  Users.push(Mock.mock({
    id: Mock.Random.id(),
    pjhm: Mock.Random.id(),
    "pjzl|1":["银承","商承"],
    djrq: Mock.Random.date(),
    cprq: Mock.Random.date(),
    dqrq: Mock.Random.date(),
    cpje: Mock.Random.natural(1,10000000),
    cprmc: Mock.Random.cname(),
    khh: Mock.Random.id(),
    "fkhmc|1":["花旗银行","农业银行","工商银行","建设银行","中国银行","恒丰银行","交通银行","民生银行"],
    mk: "测试用户",
    ck: "",
    "ywzt|1":["待提交","Checker退回","待发送","已发送","已发送待确认","已拒绝","已确认"]
  }));
}

export { LoginUsers, Users };
