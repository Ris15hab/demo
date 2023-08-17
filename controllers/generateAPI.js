const { createError } = require('../middleware/error')
const fs = require('fs');
const path = require('path');
const { modelTemplate } = require('../utils/modelTemplate')
const { controllerTemplate } = require('../utils/controllerTemplate')
const { routeTemplate } = require('../utils/routeTemplate')
const { addAllRoute, addAppRoute } = require('../utils/addRoute')
const UserDB = require('../models/userDB')

const createCRUD = async (req, res, next) => {
    try {
        const { modelName, modelSchema, modelDescription } = req.body;
        const userID = req.user.userData._id;

        //User's Model Folder
        const userModelFolder = path.join(__dirname, `../models/${userID}`);
        if (!fs.existsSync(userModelFolder)) {
            fs.mkdirSync(userModelFolder);
        }

        //get time
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, "0");
        const minutes = String(currentTime.getMinutes()).padStart(2, "0");
        const seconds = String(currentTime.getSeconds()).padStart(2, "0");
        const time = `_${hours}${minutes}${seconds}`

        //modelfilename 
        const modelFileName = modelName + time + '_' + userID
        const modelFilePath = `models/${userID}/${modelFileName}.js`
        await modelTemplate(modelFileName, modelSchema, modelFilePath)

        //User's Controller Folder
        const userControllerFolder = path.join(__dirname, `./${userID}`);
        if (!fs.existsSync(userControllerFolder)) {
            fs.mkdirSync(userControllerFolder);
        }

        const controllerFilePath = `controllers/${userID}/${modelFileName}.js`
        await controllerTemplate(modelFileName, modelSchema, modelFilePath, controllerFilePath)

        //User's Route Folder
        const userRouteFolder = path.join(__dirname, `../routes/${userID}`);
        if (!fs.existsSync(userRouteFolder)) {
            fs.mkdirSync(userRouteFolder);
        }

        const routeFilePath = `routes/${userID}/${modelFileName}.js`
        await routeTemplate(userID, modelFileName, controllerFilePath, routeFilePath)

        //adding allroutes
        const allRoutesNewData = `\n${modelFileName}: require('../${routeFilePath}'),`
        addAllRoute(allRoutesNewData)

        //adding approutes
        const appRoutesNewData = `\napp.use(allRoutes.${modelFileName});`
        addAppRoute(appRoutesNewData)

        //adding details to userDB model

        //api url
        let url = `${req.hostname}/${modelFileName}`

        if (req.hostname == "localhost") { modelAPI = `http://${req.hostname}:${process.env.PORT}/${modelFileName}` }
        else { modelAPI = `https://${url}` }

        //getting time
        const date = new Date();

        // const istTimeOffset = 330; // IST timezone offset: UTC+5:30
        // const istTimeInMilliseconds = date.getTime() + istTimeOffset * 60 * 1000;

        // // Create a new date object with the IST time
        // const istDate = new Date(istTimeInMilliseconds);

        // Format the date and time
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        const formattedDate = date.toLocaleDateString('en-IN', options);

        //saving model
        const userDB = new UserDB({
            modelName,
            modelStoredAs: modelFileName,
            modelDescription,
            modelAPI,
            dateTime: formattedDate,
            userID
        })
        await userDB.save();

        res.status(200).json({ message: "success" })
    } catch (err) {
        next(err)
    }
}

const deleteCRUD = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const userDB = await UserDB.findOne({ _id })
        console.log(userDB)
        const userID = req.user.userData._id
        
        await fs.readFile(`${__dirname}/../utils/app-routeData.txt`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading app-routeData.txt :', err);
                return;
            }
            // console.log(data)
            const lineToRemove = `app.use(allRoutes.${userDB.modelStoredAs});`
            var newData = data.replace(lineToRemove, '');
            // console.log(newData.trim())
            newData = newData.trim()
            fs.writeFile(`${__dirname}/../utils/app-routeData.txt`, newData, (err) => {
                if (err) {
                    console.error('Error in adding data to app-routes.js', err);
                } else {
                    console.log('app-routes.js successfully updated');
                }
            });
            //adding approutes
            const appRoutesNewData = ``
            addAppRoute(appRoutesNewData)
        })

        await fs.readFile(`${__dirname}/../utils/allRoutesData.txt`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading allRoutesData.txt :', err);
                return;
            }
            // console.log(data)
            const lineToRemove = `${userDB.modelStoredAs}: require('../routes/${userID}/${userDB.modelStoredAs}.js'),`;
            var newData = data.replace(lineToRemove, '');
            // console.log(newData.trim())
            newData = newData.trim()
            fs.writeFile(`${__dirname}/../utils/allRoutesData.txt`, newData, (err) => {
                if (err) {
                    console.error('Error in adding data to allRoutes.js', err);
                } else {
                    console.log('allRoutes.js successfully updated');
                }
            });
            //adding allroutes
            const allRoutesNewData = ``
            addAllRoute(allRoutesNewData)
        })


        await fs.unlink(`${__dirname}/./${userID}/${userDB.modelStoredAs}.js`, (err) => {
            if (err) {
              console.error('Error deleting controller file:', err);
              return;
            }
            console.log('Controller File deleted successfully.');
        });

        await fs.unlink(`${__dirname}/../models/${userID}/${userDB.modelStoredAs}.js`, (err) => {
            if (err) {
              console.error('Error deleting model file:', err);
              return;
            }
            console.log('model File deleted successfully.');
        });

        await fs.unlink(`${__dirname}/../routes/${userID}/${userDB.modelStoredAs}.js`, (err) => {
            if (err) {
              console.error('Error deleting routes file:', err);
              return;
            }
            console.log('routes File deleted successfully.');
        });

        await UserDB.deleteOne({_id})
        res.status(200).json({messgae:"database deleted successfully"})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCRUD,
    deleteCRUD
}