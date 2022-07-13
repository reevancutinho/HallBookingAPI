import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import halls from "./data/halldata.js";
import bookings from "./data/bookingdata.js";
import checkAvailability from "./hallcheck.js";

dotenv.config();
console.log(process.env.PORT);

const app = express();

app.use(cors());
app.use(express.json());

// PORT
const PORT = process.env.PORT;


app.get("/", function (request, response) {
  let html = "";
  html += "<h1>Hall Booking</h1>";
  html += '<a href="/halls"><button>Show all Halls</button></a>   ';
  html += '<a href="/bookings"><button>Show all bookings</button></a>   ';
  html += '<a href="/customers"><button>Show Customers</button></a> ';
  response.set("Content-Type", "text/html");
  response.send(html);
});

app.get("/halls", function (request, response) {
  response.send(halls);
});

app.post("/halls", function (request, response) {
  const addhall = request.body;
  halls.push(addhall);
  response.send(addhall);
});


app.get("/bookings", function (request, response) {
  let hallBookingDetails = bookings.map((obj) => {

    let getBookingDetail = bookings.filter((booking) => {
      return booking.hall_id == obj.hall_id && booking.date == obj.date;
    });

    let gethallDetail = halls.find((hall) => {
      return hall.hall_id == obj.hall_id;
    });

    let bookingStatus = getBookingDetail > 0 ? "vacant" : "booked";

    obj.hall_name = gethallDetail.hall_name;
    obj.booking_status = bookingStatus;

    return obj;
  });
  response.send(hallBookingDetails);
});

app.post("/bookings", function (request, response) {
  const addhall = request.body;

  console.log(addhall.hall_id);
  console.log(addhall.date);
  console.log(addhall.startTime);
  console.log(addhall.endTime);

  console.log(
    checkAvailability(
      addhall.hall_id,
      addhall.date,
      addhall.startTime,
      addhall.startTime
    )
  );

  if (
    checkAvailability(
      addhall.hall_id,
      addhall.date,
      addhall.startTime,
      addhall.startTime
    ) === false
  ) {
    response.status(404).send("hall Not Available on this date");
  } else {
    bookings.push(addhall);
    response.status(200).send("hall is Available on this date");
  }
});


app.get("/customers", function (request, response) {
  let hallBookingDetails = bookings.map((obj) => {

    let gethallDetail = halls.find((hall) => {
      return hall.hall_id == obj.hall_id;
    });

    obj.hall_name = gethallDetail.hall_name;

    return obj;
  });
  response.send(hallBookingDetails);
});

app.listen(PORT, () => console.log(`Server started in localhost:` + PORT));