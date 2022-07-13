// Add Check hall Availability on Date //
// =========================== //
function checkAvailability(hallid, date, strt, end) {
    // Get hall Bookings
    // const gethallBooking = halls.find( x => x.hall_id === 1);
    // console.log("gethallBooking", gethallBooking);
    let fdBookings = bookings.filter((obj) => {
      return obj.hall_id == hallid && obj.date == date;
    });
  
    console.log(fdBookings);
  
    if (fdBookings.length > 0) {
      return false;
    } else {
      return true;
    }
  
    // console.log(fdBookings);
  }

  export default checkAvailability;