const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

app.db = router.db

const rules = auth.rewriter({
    users: 600,
    books: 664,
    '/users/:id/books': 600,
    '/books/:id/collaborators': 600
})

app.use(cors('*'))
app.use(rules)
app.use(auth)

app.get('/shared/books', (req, res) => {
    const books = app.db.get('books').value()

    res.json(books.filter(book => book.collaborators.includes(+req.query.userId)))
})

app.get('/books/:id/collaborators', (req, res) => {
    const books = app.db.get('books').value()

    const collaborators = books.find(book => +book.id === +req.params.id).collaborators

    const users = app.db.get('users').value()

    res.json(users.filter(user => collaborators.includes(user.id)).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
    })))
})

app.post('/books/:id/collaborators', (req, res) => {
    const books = app.db.get('books').value()

    const collaborators = books.find(book => +book.id === +req.params.id).collaborators

    if (collaborators.includes(req.body.id)) {
        return res.status(400).send('User is already a collaborator')
    }

    collaborators.push(+req.body.id)

    app.db.get('books').find({ id: +req.params.id }).assign({ collaborators }).write()

    res.jsonp(books.find(book => +book.id === +req.params.id).collaborators)
})

app.delete('/books/:id/collaborators/:userId', (req, res) => {
const books = app.db.get('books').value()

    const collaborators = books.find(book => +book.id === +req.params.id).collaborators

    if (!collaborators.includes(+req.params.userId)) {
        return res.status(400).send('User is not a collaborator')
    }

    app.db.get('books').find({ id: +req.params.id }).assign({ collaborators: collaborators.filter(id => id !== +req.params.userId) }).write()

    res.jsonp(books.find(book => +book.id === +req.params.id).collaborators)
})

app.use(router)

app.listen(8080, () => {
    console.log(`Server available at http://localhost:8080`)
})