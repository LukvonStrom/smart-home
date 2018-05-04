module.exports = (res, logic, key) => {
    Raven.context(async () => {
        let logic_result = await logic();

        let result = {};
        result[key] = logic_result;

        res.json(result);
    });

};


