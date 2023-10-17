
import Contact from "@/models/Contact";
import connectDb from "@/middleware/mongoose";
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const contact = new Contact({
        name,
        email,
        message,
      });

      await contact.save();

      res.status(200).json({ success: 'Contact request submitted successfully' });
    } catch (error) {
      console.error('Error while submitting contact request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'This method is not allowed' });
  }
};

export default connectDb(handler);
