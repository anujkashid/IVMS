const rmodel = require('./registration_model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST API
const Adduser = async (req, res) => {
    const { collage_name,
        reg_state,
        reg_district,
        reg_city,
        reg_university_name,
        reg_principal_name,
        reg_contact_person,
        reg_contact_person_contact1,
        reg_contact_person_contact2,
        reg_college_email_id,
        reg_college_username,
        reg_password,  
        reg_mou_sign,
        reg_status } = req.body;
    
    try {
        // Check if the student already exists
        let user = await rmodel.findOne({ reg_college_username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reg_password, salt);

        // Create a new student instance
        const RegistrationData = new rmodel({
            collage_name,
            reg_state,
            reg_district,
            reg_city,
            reg_university_name,
            reg_principal_name,
            reg_contact_person,
            reg_contact_person_contact1,
            reg_contact_person_contact2,
            reg_college_email_id,
            reg_college_username,
            reg_password: hashedPassword,
            reg_mou_sign,
            reg_status,
            
        })
        // const data = await RegistrationData.save()
        // res.status(200).send({ data })
          await RegistrationData.save()

        // Generate a JWT token
        const token = jwt.sign(
            { userId: RegistrationData._id }, 
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.json({ token });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// User Login
const Login = async (req, res) => {
    const { reg_college_username,reg_password } = req.body;

    try {
        // Check if the student exists
        let user = await rmodel.findOne({ reg_college_username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(reg_password, user.reg_password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, // Add a JWT_SECRET to your environment variables
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.json({ 
            collage_name:user.collage_name,
            _id: user._id,
            token : token,
            mousigned:user.reg_mou_sign
         });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


// GET APIs
const Getuser = async (req, res) => {
    try {
        const data = await rmodel.find({})
        res.status(200).send({ data })
    }

    catch (err) {
        res.status(400).send(err)
        console.log(err)
    }
}
// GET API ONLY FIND ONE
const GetuserById = async (req, res) => {
    try {
        const { _id } = req.params
        const userData = await rmodel.findOne({ _id: _id })
        res.status(200).send({ userData })

    } catch (err) {
        // res.status(400).send(err)
        console.log(err)
    }
}

// DELETE API
const Deleteuser = async (req, res) => {

    try {
        const data = await rmodel.deleteOne({ _id: req.params._id })
        res.status(200).send({ data })
    } catch (err) {
        res.status(500).send(err)
    }
}

// UPDATE API
const Updateuser = async (req, res) => {
    const { 
        collage_name,
            reg_state,
            reg_district,
            reg_city,
            reg_university_name,
            reg_principal_name,
            reg_contact_person,
            reg_contact_person_contact1,
            reg_contact_person_contact2,
            reg_college_email_id,
            reg_college_username,
            reg_password: hashedPassword,
            reg_mou_sign,
            reg_status,
        } = req.body;
    try {


        const data = await rmodel.updateOne(
            { _id: req.params._id },
            {
                $set: {
                    collage_name,
                    reg_state,
                    reg_district,
                    reg_city,
                    reg_university_name,
                    reg_principal_name,
                    reg_contact_person,
                    reg_contact_person_contact1,
                    reg_contact_person_contact2,
                    reg_college_email_id,
                    reg_college_username,
                    reg_password: hashedPassword,
                    reg_mou_sign,
                    reg_status,
                }
            },
        );

        if (data) {
            res.status(200).send({ message: "Data Updated Successfully" });
        } else {
            res.status(404).send({ message: "Can Not User" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};


const forgetPassword = async (req, res) => {
    const { reg_college_email_id, reg_password } = req.body;
  
    try {
      // Check if the student exists by email
      const student = await rmodel.findOne({ reg_college_email_id });
      if (!student) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(reg_password, salt);
  
      // Update the password in the database
      student.reg_password = hashedPassword;
      await student.save();
  
      res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };
module.exports = { Adduser, Login, Getuser, GetuserById, Deleteuser, Updateuser,forgetPassword }
