import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser" 
dotenv.config()

import {db} from "./util/bookshelf.js"
import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, updateDoc} from "firebase/firestore"

const app = express();
const port = 8080;

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000"
	})
)
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/", async (req, res) => {
	res.send("Hello World!");
});


app.get("/bookshelf", async (req, res) => {
 try {
 	console.log ("getting bookinfo");
   
const collectionRef = collection(db, "bookshelf");
const collectionSnap = await getDocs(collectionRef);
const docs = [];

function formatTime(date) {
	return date.toLocaleTimeString('en-US', { 
	  hour: '2-digit', 
	  minute: '2-digit',
	  second: '2-digit',
	  hour12: true 
	});
  }

collectionSnap.forEach((docSnap) => {
    const docRef = doc(db, "bookshelf", docSnap.id);

    const data = docSnap.data();

    const timestamp = data.timeAdded;

		const date = timestamp.toDate();
		const localDate = date.toLocaleDateString();
		const time = formatTime(date);

    updateDoc(docRef, {
        date: localDate,
        time: time
    });
});

collectionSnap.forEach((docSnap) => {
    const data = docSnap.data();
    docs.push(data);
});

	res.status(200).send(docs);
	} catch (e) {
	console.error(e);
	res.status(500).send("Error fetching books");
	}
})

app.post("/bookshelf", async(req, res) => {
	console.log("posting book info");
	const bookRef = collection(db, "bookshelf")
	const bookBody = req.body
	try {
		await addDoc (bookRef, bookBody)
	} catch(e){
		console.error(e)
		res.status(500);
	}
	res.status(200).send("Successfully added book")
})

app.delete("/bookshelf", async (req, res) =>{
	console.log("deleting book info");
	const bookid =req.params;
	try{
		const bookRef = collection(db, "bookshelf", bookid);
		await deleteDoc(bookRef);
		res.status(200).send('Successfully deleted book ${req.params}');
	} catch (e) {
		console.error(e);
		res.status(500).send("Error deleting book");
	}
	});

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()


