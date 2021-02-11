const data = {
    user: []
}

exports.addUser = (username, password) => {

    if (data.user.find(item => item.username === username)) {
        return false;
    } else {
        data.user.push({
            username, password, token: Date.now()
        })
        return true
    }

}

exports.queryUser = (username, password) => {
    const user = data.user.find(item => item.username === username && item.password === password)
    if (!user) return false;
    user.token = Date.now();

    if(username === 'wangpeng') {
        user.authList = [
            {
                auth: 'admin',
                name: '系统管理',
                id: 1,
                pid: -1
            },
            {
                auth: 'account',
                name: '账号管理',
                id: 2,
                pid: 1
            },
            {
                auth: 'skin',
                name: '皮肤管理',
                id: 3,
                pid: 1
            },
            {
                auth: 'article',
                name: '文章管理',
                id: 4,
                pid: -1
            },
        ]
    } else {
        user.authList = [
            {
                auth: 'account',
                name: '用户管理'
            }
        ]
    }
    return user;
}

exports.queryUserByToken = token => {
    const user = data.user.find(item => item.token == token)
    if (!user) return false;
    user.token = Date.now();
    return user;
}
