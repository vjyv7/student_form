const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { dbInstance, extractedFields } = require('./db');
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

dbInstance.authenticate()
    .then(() => { console.log('DataBase: Database Connected.'); })
    .catch(err => { console.log('Database: Error: ' + err); })

app.get('/', (req, res) => {
    res.send(`
        <form action="/api/submit" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email"><br><br>

        <label for="course">course:</label>

        <select name="course" id="course"> 
          <option value="BCA">BCA</option>  
          <option value="BBA">BBA</option>  
          <option value="B.Tech">B.Tech</option>  
          <option value="MBA">MBA</option>  
          <option value="MCA">MCA</option>  
          <option value="M.Tech">M.Tech</option>  
        </select><br><br>

        <input type="radio" id="male" name="gender" value="male">
        <label for="male">Male</label><br>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label><br>
        <input type="radio" id="other" name="gender" value="other">
        <label for="other">Other</label><br><br>

        <label for="dob">DOB:</label>
        <input type="date" id="dob" name="dob"><br><br>
        <label for="comments">comments :</label>

<textarea id="comments" name="comments" rows="4" cols="50">
</textarea><br><br>
<input type="checkbox" id="terms" name="terms" value="I accept terms">
<label for="terms"> Aggreed the Terms and conditions</label><br><br>

        <input type="submit" value="Submit" />
        </form>
      `);
});

app.get('/viewDoc', (req, res) => {
    res.send(`
        <form action="/api/view" method="post">
       
        <input type="submit" value="Submit" />
        </form>
      `);
});
app.post('/api/submit', async (req, res, next) => {
    let response = await saveDataInTable(req.body);
    return response;
});
app.post('/api/view', async (req, res, next) => {
    let response = await getsavedData(req.body);
    res.send(response);
});
app.post('/api/update', async (req, res, next) => {
    let response = await updateData(req.body);
    res.send(response);
});

const saveDataInTable = async (data) => {
    let result = await extractedFields.create(data).then((savedData) => {
        return savedData;
    }).catch(async (error) => {
        return error;
    });
    return "data_updated"
}
const getsavedData = async (data) => {
    const result = extractedFields.findAll(
        {
            attributes: ['id', 'name', 'email', 'gender','dob','comments','course','terms'],
            raw: true,
        }
    ).then(savedList => {
        for (let i in savedList)
            savedList[i].pnoneNo = parseInt(savedList[i].pnoneNo);
        return savedList;
    }).catch(async (error) => {
        return error;
    });
    return result;
}
const updateData = async (data) => {
    const [updateCol, updatedData] = await extractedFields.update(data, {
        where: { id: data.id },
        raw: true,
        returning: true
    }).then((updateHolidayData) => {
        return updateHolidayData
    }).catch(async (error) => {
        return ['', error];
    });
    return updatedData;
}
let listen = app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});