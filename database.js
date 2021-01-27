const data = {
    user: []
}

exports.addUser = (username, password) => {

    if (data.user.find(item => item.username === username)) {
        return false;
    } else {
        data.user.push({
            username, password
        })
        return true
    }

}

exports.queryUser = (username, password) => data.user.find(item => item.username === username && item.password === password)
