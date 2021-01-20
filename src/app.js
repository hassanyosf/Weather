const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express();

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Hassan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hassan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hassan',
        helpText: 'this is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if (error)
            return res.send({
                error
            })

        forecast(data, (error, forecastData) => {
            if (error)
                return res.send({
                    error
                })

            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: data.location
            })

        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Hassan',
        title: '404',
        errorMessage: 'Help article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Hassan',
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})

