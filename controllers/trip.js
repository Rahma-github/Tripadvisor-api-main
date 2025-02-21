const Trip = require("../models/trip");

/** Create a new trip */
exports.createTrip = async (req, res) => {
  try {
    const { tripName, destination, date, description, visibility, owner } = req.body;
    
    const newTrip = new Trip({
      tripName,
      destination,
      date,
      description,
      visibility,
      owner,
    });

    await newTrip.save();
    res.status(201).json({ message: "Trip created", trip: newTrip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Get all trips */
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Get a trip by ID */
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Share a trip */
// exports.shareTrip = async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.id);
//     if (!trip) return res.status(404).json({ message: "Trip not found" });

//     const shareableLink = `http://yourfrontend.com/join-trip?code=${trip.inviteCode}`;
//     res.json({ shareableLink });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




/** Share a trip */
exports.shareTrip = async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) return res.status(404).json({ message: "Trip not found" });
  
      const shareableLink = `https://www.tripadvisor.com/trip/${trip._id}`;
      
      res.json({ shareableLink });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
/** Join a trip */
// exports.joinTrip = async (req, res) => {
//   try {
//     const { userId, inviteCode } = req.body;
//     const trip = await Trip.findOne({ inviteCode });

//     if (!trip) return res.status(404).json({ message: "Invalid invite code" });

//     if (trip.users.includes(userId)) {
//       return res.status(400).json({ message: "User already joined" });
//     }

//     trip.users.push(userId);
//     await trip.save();

//     res.json({ message: "Joined trip successfully!", trip });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


/** Join a trip */
exports.joinTrip = async (req, res) => {
    try {
      const { userId } = req.body;
      const trip = await Trip.findById(req.params.id);
  
      if (!trip) return res.status(404).json({ message: "Trip not found" });
  
      // Prevent duplicate join
      if (trip.users.includes(userId)) {
        return res.status(400).json({ message: "User already joined" });
      }
  
      trip.users.push(userId);
      await trip.save();
  
      res.json({ message: "Joined trip successfully!", trip });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
/** Get users for a trip */
exports.getTripUsers = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("users", "username email");

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json({ users: trip.users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Update a trip */
exports.updateTrip = async (req, res) => {
  try {
    const { visibility, tripName, destination, date, description } = req.body;
    
    if (visibility && !["public", "restricted"].includes(visibility)) {
      return res.status(400).json({ error: "Invalid visibility option. Use 'public' or 'restricted'." });
    }

    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { tripName, destination, date, description, visibility },
      { new: true }
    );

    if (!trip) return res.status(404).json({ message: "Trip not found" });

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Delete a trip */
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Duplicate a trip */
exports.duplicateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const newTrip = new Trip({
      tripName: "Copy of " + trip.tripName,
      destination: trip.destination,
      date: trip.date,
      description: trip.description,
      visibility: trip.visibility,
      owner: req.user._id,
      users: trip.users,
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
