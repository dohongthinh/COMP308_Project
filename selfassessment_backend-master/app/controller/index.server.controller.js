

exports.home= (req,res) => {
  res.send("Project");
}

const tf = require('@tensorflow/tfjs');
//require('@tensorflow/tfjs-node');

const symptoms = require ('../../symptoms.json');
const conditions = Array.from(new Set(symptoms.map(item => item.condition)));

exports.checklist = (req, res) =>{
    var session = req.session;

    session.cough = req.body.cough;
    session.fever = req.body.fever;
    session.fatigue = req.body.fatigue;
    session.nausea = req.body.nausea;
    session.headache = req.body.headache;
    res.redirect('/analyzeData');

};

exports.predictEmergency = (req, res) => {
    
    const trainingData = tf.tensor2d(symptoms.map(item => [
        item.cough,
        item.fever,
        item.fatigue,
        item.headache,
        item.nausea
    ]));

    const outputData = tf.tensor2d(symptoms.map(item => [
        item.condition === "positive" ? 1 : 0,
        item.condition === "negative" ? 1: 0
    ]));

    var session = req.session;

    // console.log("session data: ");
    // console.log("session.cough: ", session.cough);
    // console.log("session.fever: ", session.fever);
    // console.log("session.fatigue: ", session.fatigue);
    // console.log("session.headache: ", session.headache);
    // console.log("session.nausea: ", session.nausea);

    var cough = parseInt(req.body.cough);
    var fever = parseInt(req.body.fever);
    var fatigue = parseInt(req.body.fatigue);
    var headache = parseInt(req.body.headache);
    var nausea = parseInt(req.body.nausea);
    var Epoch = parseInt(50);

    const data = tf.tensor2d ([[cough, fever, fatigue, headache, nausea]])

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [5],
        activation: "sigmoid",
        units: 6
    }));

    model.add(tf.layers.dense({
        inputShape: [6],
        activation: "sigmoid",
        units: 2
    }));

    model.add(tf.layers.dense({
        inputShape: [2],
        activation: "sigmoid",
        units: 2
    }));

    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.7),
    });

    async function run() {
        const startTime = Date.now();
        await model.fit(trainingData, outputData, {
            epochs:Epoch,
            callbacks: {
                onEpochEnd: async (epoch, log) => {
                    console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                    elapsedTime = Date.now() - startTime;
                    console.log('elapsed time: ' + elapsedTime)
                }
            }
        })

        const results = model.predict(data);    
        var index = tf.argMax(results, axis = 1).dataSync();
        results.array().then(array => {
            var datatosend = {result: array[0], condition:conditions[index]};
            res.status(200).send(datatosend);
            var session = req.session;
            console.log(datatosend);
        });
    }
    run();
};


exports.render = (req, res) => {    
    //display index.ejs
    res.render('index', {
        title: 'Express REST API'
    });   

};  