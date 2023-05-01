const mongoose = require('mongoose');
// require('dotenv').config({ path: "../env" });
module.exports = () => {
   
	try {
		mongoose.connect("mongodb+srv://CollegeInsight2023:collegeInsight%402023@cluster0.yuowgtf.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	} 
}