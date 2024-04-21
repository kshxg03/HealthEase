const pillReminderModel = require("../models/pillReminderModel")

const addReminderController = async (req, res) => {
    try {
        const reminder = new pillReminderModel({
            name: req.body.name, 
            time: req.body.time, 
            postedBy: req.auth._id, 
        });
        await reminder.save();
        res.status(201).json({ message: 'Reminder added successfully' });
    } catch (error) {
        console.error('Error adding reminder:', error);
        res.status(500).json({ message: 'Failed to add reminder' });
    }
};


const getUserRemindersController = async (req, res) => {
    try {
        const reminders = await pillReminderModel.find({ postedBy: req.auth._id });
        res.json(reminders);
    } catch (error) {
        console.error('Error fetching user reminders:', error);
        res.status(500).json({ message: 'Failed to fetch reminders' });
    }
};

const deleteReminderController = async (req, res) => {
    try {
      const deletedReminder = await pillReminderModel.findByIdAndDelete(req.params.id);
      if (!deletedReminder) {
        return res.status(404).json({ message: 'Reminder not found' });
      }
      res.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
      console.error('Error deleting reminder:', error);
      res.status(500).json({ message: 'Failed to delete reminder' });
    }
  };
  


module.exports = { addReminderController, getUserRemindersController, deleteReminderController }
