const GeneralLogic = require("./BL/Logic/generalLogic"),
  ExerciseLogic = require("./BL/Logic/exerciseLogic"),
  UserLogic = require("./BL/Logic/userLogic"),
  LangLogic = require("./BL/Logic/langLogic");
const userLogic = require("./BL/Logic/userLogic");
// const langLogic = require("./BL/langLogic");
// const userLogic = require("./BL/userLogic");

module.exports = (app) => {
  //==================exercise===================

  app.post("/exercise", async (req, res) => {
    const token = req.headers.authorization;

    console.log("in 1");
    try {
      console.log("in router.js app.post");
      console.log(req.body);

      let result = await ExerciseLogic.create(req.body, token);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });

  //read a exercise
  //   to run in postman:
  //   // get -http://localhost:5000/exercise or http://localhost:5000/exercise/<id>

  app.get("/exercises/:id?", async (req, res) => {


    let result;
    try {
      //const token = req.headers.authorization
      // console.log(token);

      result = req.params.id
        ? await GeneralLogic.getSingleExercise(req.params.id)
        : await ExerciseLogic.read();
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  app.get("/fullExercisesInLang/:langName", async (req, res) => {
    console.log("in 3");
    let result;
    try {
      result = await ExerciseLogic.read({
        prog_lang: `${req.params.langName}`,
      });
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  app.get("/exercisesCardsInLang/:langName", async (req, res) => {
    //console.log("in 4");
    // const token = req.headers.authorization
    // console.log(token);
    let result;
    try {
      result = await ExerciseLogic.read(
        { prog_lang: `${req.params.langName}` },
        { title: 1, details: 1, difficulty: 1, exec_type: 1, icon: 1, tags: 1 },
        // token
      );
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
    //console.log(result);
  });

  //update an exercise
  app.put("/exercise/edit/:id?", async (req, res) => {
    console.log("in router");

    let result;
    try {
      const token = req.headers.authorization;
      const data = req.body;
      console.log(data);

      console.log(token);
      // if(!token)
      // {
      //   console.log("token expaired");
      //   result = "token expaired";

      // }
      // else
      result = await ExerciseLogic.update(req.params.id, data, token);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  //delete an exercise
  app.delete("/exercise/delete/:id", async (req, res) => {
    console.log("in 6");
    const token = req.headers.authorization;

    let result;
    try {
      result = await ExerciseLogic.delete(req.params.id, token);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });


  //==================lang===================

  app.get("/language/:id?", async (req, res) => {
    console.log("in 1");

    let result;
    try {
      result = req.params.id
        ? await LangLogic.readLang({ _id: req.params.id })
        : await LangLogic.readAllLang();
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });


  app.post("/language", async (req, res) => {
    console.log("in 11");

    let result;
    try {
      result = await LangLogic.create(req.body);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });
  //==================user===================
  // READ - Users (for test) - V
  app.get("/user", async (req, res) => {
    console.log("in 7");

    res.send(await UserLogic.read());
  });

  app.get("/usertoken", async (req, res) => {
    console.log("in 7");


    res.send(await UserLogic.getTokenStatus());
  });
  app.get('/users', async (req, res) => {
    console.log(req);
    const token = req.headers.authorization;

    res.send(await userLogic.readAllUsersData(token));
  });

  // login
  app.post("/login", async (req, res) => {
    console.log("in 8");
    try {
      let result = await UserLogic.login(req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });
  // {
  // "email":"israel@gmail.com",
  // "password":"israeli22"
  // }
  // register - V
  app.post("/register", async (req, res) => {
    console.log("in 9");

    try {
      let result = await UserLogic.register(req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });

};



