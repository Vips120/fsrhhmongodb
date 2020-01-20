let mongoose = require("mongoose");

//connection
mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}`));


let courseSchema = new mongoose.Schema({
    author: { type: String, required: true },
    price: { type: Number, required: true },
    courses: [String],
    date: { type: Date, default: Date.now() },
    isPublished: { type: Boolean, required: true }
});

let courserModel = mongoose.model("courses", courseSchema);

//create
async function Course() {
    let authorcourse = new courserModel({
        author: "makdoe",
        price: 4000,
        courses: ["BACKEDN END", "GRAPHQL"],
        isPublished: true
    });
    let data = await authorcourse.save();
    console.log(data);
};
    
//Course();

//fetch record

//$gt,$gte,$lt,$lte,$eq,$neq, $in, $nin
//and, or
async function AllCourses() {
    // let data = await courserModel
    //     .find({ "author": "makdoe" })
    //     .select("author price -_id")
    let data = await courserModel
        // .find({
        //     "price": {
        //     $gte:200, $lte:600
        // }})
        // .find({
        //     "price": {
        //     $in:[200,400,500,600]
        // }})
        .find()
        .and([{"price":200}, {"author":"makdoe"}])
        .select("author price -_id")
        .sort("-price")
    .count()
    console.log(data);
};
AllCourses();