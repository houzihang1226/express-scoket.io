const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))


const server = require('http').createServer(app);

const io = require('socket.io')(server);
// 登陆接口
app.post('/login', (req, res) => {
    console.log(req.body)
    let { name, password } = req.body
    if (name === 'admin') {
        if (password === 'admin') {
            res.json({ code: 200, msg: '验证通过' })
        } else {
            res.json({ code: 500, msg: '密码错误' })
        }
    } else {
        res.json({ code: 500, msg: '用户名错误' })
    }

})



const lsit = ['仁义道德，也是一种奢侈', '时间不在于你拥有多少，而在于你怎样使用', '放马过来吧！你会死的很光荣的', '念当年有爱的我，可惜啊，你们看不到啦',
    '即使一无所有，也要未雨绸缪', '落叶的一生，只是为了归根么', '千军万马一将在，探囊取物有何难', '顺我者昌，逆我者亡，此乃天意', '我可以想去哪就去哪，但是我只想进入你的心里',
    '我宁愿犯错误，也不愿什么都不做', '不要测试你的运气，召唤师', '死亡如风，常伴吾身', '我在时光中穿梭，只为找回曾经美好的时光'
]

// websocket
io.on('connection', (socket) => {
    // 向客户端发送消息
    socket.emit('msg', {
        name: '服务端',
        content: '你好,欢迎使用Socket.io'
    })
    // 向所有客户端发送消息
    io.emit('broadcast',/* */)
    socket.on('msg', (msg) => {
        console.log(lsit[Math.floor(Math.random() * lsit.length)])
        setTimeout(() => {
            socket.emit(msg.type, {
                name: '服务端',
                content: lsit[Math.floor(Math.random() * lsit.length)]
            })
        }, 500)

    })

});

app.use(express.static(`${__dirname}/static`))
app.get('/', function (req, res) {

    res.sendFile(`${__dirname}/index.html`)
})
app.get('*', function (req, res) {
    res.send('Hello World')
})
server.listen(3000)