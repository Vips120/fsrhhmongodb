let mongoose = require("mongoose");

//connection
mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}`));

let authorSchema = new mongoose.Schema({
    author: { type: String, required: true },
    website: { type: String, required: true },
    isPublished: { type: Boolean }
});

let courseSchema = new mongoose.Schema({
    course: { type: String, required: true },
    // authorId:{type: mongoose.Schema.Types.ObjectId, ref:"authors"}
    author:{type: authorSchema}
});

let authorModel = mongoose.model("authors", authorSchema);
let courseModel = mongoose.model("courses", courseSchema);

async function createAuthor(author, website, isPublished) {
    let data = new authorModel({
        author,
        website,
        isPublished
    });
    let item = await data.save();
    console.log(item);
};

// createAuthor("Ryan Dalh", "www.nodejs.com", true);


async function CreateCourse(course, author) {
    let data = new courseModel({
        course,
        author
    });

    let item = await data.save();
    console.log(item);
};

// CreateCourse("Javascript", new authorModel({
//     author: "nick",
//     website: "www.nick.com",
//     isPublished:true
// }));

async function fetchCourse() {
    // let data = await courseModel
    //     .find()
    //     .populate("authorId", "author website")
    //     ;

    let data = await courseModel.find();
    console.log(data);
};

fetchCourse();

