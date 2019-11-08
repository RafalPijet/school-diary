const Class = require('../models/class.model');

exports.getClassByTeacherId = async (req, res) => {

    try {
        let {teacherId} = req.params;
        let result = [];
        let allClass = await Class.find();
        allClass.forEach(item => {
            item.subjectTeachers.forEach(teacher => {

                if (teacher.id === teacherId) {
                    result = [...result, item]
                }
            })
        });
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};
