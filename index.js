const PORT = 8000;
const express = require('express')
const axios = require('axios')
const { Client } = require('pg')


const app = express()

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "nodejs"
})

app.get('/getrepodetails', (req, res) => {
    axios.get('https://api.github.com/users/santhoshissa/repos')
        .then((response) => {
            var details = response.data
            console.log(details)
            client.connect();
            client.query(`Insert into public."repo_details"(repodetails) values($1)`, [details], (err, res) => {
                if (!err) {
                    // console.log(res.rows)
                    client.end()
                } else {
                    console.log(err.message)
                }

            })
        })
})




client.query(`Select * from public."repo_details"`, (err, res) => {
    if (!err) {
        console.log(res.rows)
    } else {
        console.log(err.message)
    }

})




app.listen(PORT, () => console.log(`server running on port ${PORT}`))