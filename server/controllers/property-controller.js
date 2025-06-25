const Property = require("../models/property-model");


exports.addProperty = async (req, res) => {
  try {
    const images = req.files.map(file => file.path); // ✅ All Cloudinary URLs

    const newProperty = new Property({
      ...req.body,
      images,
    });

    await newProperty.save();

    res.status(200).json({ success: true, message: "Property added.", data: newProperty });
  } catch (error) {
    console.error("Property not created", error);
    res.status(500).json({ message: "Property not created" });
  }
};

exports.fetchProperty = async (req ,res) =>{
  try {
    const property = await Property.find().sort({ created: -1 });
    res.status(200).json({ success: true, property });

  } catch (error) {
    res.status(500).json({ error: "Internal serber error" });
  }
}

exports.filterProperties = async (req, res) => {
  try {
    const { types, bhk, furnishing, allowedFor } = req.body;

    const q = {};

    if (types?.length) q.type = { $in: types.map((t) => t.toLowerCase()) };
    if (bhk?.length)  q.bhk  = { $in: bhk.map((b) => parseInt(b)) };

    if (furnishing)   q.furnishing = furnishing.toLowerCase();

    if (allowedFor) {
      const map = { Family: "family", Bachelors: "bachelor", Anyone: "both" };
      q.preferance = map[allowedFor];
    }

    const properties = await Property.find(q).sort({ createdAt: -1 });
    res.status(200).json({ success: true, properties });
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ success: false, message: "Filter failed" });
  }
};

exports.getDisById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    console.log(property);
    if (!property) {
      res.status(400).json({ error: "no property found" });
    }
    res.status(200).json({ success: true, property });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

exports.incrementViews = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "property not found" });

    property.viwes = (property.viwes || 0) + 1;
    await blog.save();
    return res.status(200).json({ success: true, viwes: property.viwes });
  } catch (error) {
    return res.status(500).json({ message: "Error incrementing views" });
  }
};

