const express = require("express")
const helmet = require("helmet")
const path = require("path")

const PORT = 5001
const app = express()
app.use(express.static(__dirname + "/public"))
app.use(helmet.hidePoweredBy())
// does not allow another site use your site as a iframe
app.use(
  helmet.frameguard({
    action: "DENY",
  })
)

// turn off xssFilter because it still has some problems
app.use(helmet.xssFilter())

// disable browser to change the MIME Type of file
// because it can cause
app.use(helmet.noSniff())
app.use(helmet.ieNoOpen())
app.use(
  helmet.hsts({
    maxAge: 90 * 24 * 60 * 60,
  })
)
app.use(helmet.dnsPrefetchControl())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "www.w3schools.com"],
    },
  })
)

app.get("/", (_, res) =>
  res.send(
    `<div>Hello world <img src="https://www.w3schools.com/w3css/img_lights.jpg" /><img src="${"images/lights.jpeg"}" /></div>`
  )
)
app.get("/with-iframe", (_, res) =>
  res.send(`<div><iframe src="http://localhost:${PORT}" /></div>`)
)
app.get("/test", (req, res) => {
  //   res.setHeader("Content-Type", "application/octet-stream")
  //   res.setHeader(
  //     "Content-Disposition",
  //     'attachment; filename="new-test-file.html"'
  //   )
  return res.sendFile(path.join(__dirname, "public/templates/index.html"))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
