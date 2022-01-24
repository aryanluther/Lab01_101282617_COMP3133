var fs = require('fs') 
var csv = require('csv-parser')
var path = require('path') 

// --- Deleting the file ----
fs.unlink('canada.txt', (err) => {
    if (err) {
        console.error(err)
    }
    console.log("Deleted file canada.txt")
})
fs.unlink('usa.txt', (err) => {
    if (err) {
        console.error(err)
    }
    console.log("Deleted file usa.txt")

})

let csvp = `${__dirname}${path.sep}input_countries.csv`
let canada = `${__dirname}${path.sep}canada.txt`
let usa = `${__dirname}${path.sep}usa.txt`

// Functions to Read CSV file & Write Text File
function readData(path, csvp, country) {
    let dataArray = []
    dataArray.push(['country', 'year', 'population'])
    fs.createReadStream(csvp)
    .pipe(csv())
    .on('data', (row) => {
        const column =   Object.keys(row)
        if (row[column[0]] === country) {
            dataArray.push([row.country, row.year, row.population])
        }
    })
    .on('end', () => {
        console.log(`Reading csv file and Writing to - ${path}`)
        console.log(dataArray)
        writeData(path, dataArray)
    })
}

function writeData(path, dataArray) {
    var writeStream = fs.createWriteStream(path)
    writeStream.on('error', (err) => console.log(err))
    for (let row of dataArray) {
        writeStream.write(`${row[0]}, ${row[1]}, ${row[2]}\n`)
    }
    writeStream.end(console.log('text file written'))
}
readData(canada, csvp, 'Canada')
readData(usa, csvp, 'United States')