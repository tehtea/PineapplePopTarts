/**
 * Unit testing for Map.js functions.
 * 
 * Equivalence class testing is applied.
 */

var expect = chai.expect;

/**
 * Testing the getCoor function. 2 equivalence classes - 
 */
describe("getCoor", function() {
    describe("validPostalCode", function() {
        it("should return a non-null response", function() {
            getCoor(650111).then((resp) => {
                expect(resp != null)
            });
        });
    });

    describe("invalidPostalCode", function() {
        it("should throw an error", function() {
            getCoor(365215).catch((err) => {
                expect(err == "invalid postal code provided");
            });
        });
    });
});

/**
 * Testing incidentDataProcessing
 */
describe("incidentDataProcessing", function() {
    describe("validData", function() {
        // valid data scraped from console.log
        var validData = [[{"RecordID":26,"Name":"Jack Neo","Contact":"97324561","Location":"138507","UnitNum":"","Descr":"Steven Lim found trying to recruit people into his personal training program.","Resolved":false,"InsTime":"2019-04-01T08:25:24.090Z","InsName":"cheese"},{"RecordID":27,"Name":"Lim Teng Zui","Contact":"98456124","Location":"689859","UnitNum":"","Descr":"Flooding at the first floor of Mi Casa Apartments due to burst pipe.","Resolved":false,"InsTime":"2019-04-01T11:35:44.733Z","InsName":"cheese"},{"RecordID":28,"Name":"Jesslyn Chew","Contact":"97112233","Location":"465916","UnitNum":"Blk 2","Descr":"h1N1 outbreak","Resolved":false,"InsTime":"2019-04-01T12:45:45.593Z","InsName":"cheese"},{"RecordID":30,"Name":"Ali Ahkao Dan Muthu","Contact":"83835123","Location":"730001","UnitNum":"","Descr":"Heart attack reported.","Resolved":false,"InsTime":"2019-04-01T20:45:25.780Z","InsName":"cheese"},{"RecordID":31,"Name":"Tanaka Kaninabe","Contact":"93145252","Location":"760103","UnitNum":"","Descr":"ISIS members shooting up the streets","Resolved":false,"InsTime":"2019-04-01T20:56:54.270Z","InsName":"cheese"},{"RecordID":32,"Name":"Tan Ah Hwee","Contact":"69696969","Location":"650369","UnitNum":"","Descr":"369 members beating up elderly pedestrian for crossing the road too slowly","Resolved":false,"InsTime":"2019-04-04T11:22:42.740Z","InsName":"cheese"},{"RecordID":33,"Name":"Tan Ah Hwee","Contact":"69696969","Location":"650369","UnitNum":"","Descr":"369 members beating up an elderly","Resolved":false,"InsTime":"2019-04-04T11:26:17.333Z","InsName":"cheese"},{"RecordID":34,"Name":"Lim Bah Bee","Contact":"63612561","Location":"650111","UnitNum":"","Descr":"My Maple account kena hack","Resolved":false,"InsTime":"2019-04-04T11:29:23.160Z","InsName":"cheese"}],[{"RecordID":1,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-28T19:44:56.247Z","UpdName":"ted","Descr":"30 injured."},{"RecordID":1,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-31T14:16:20.367Z","UpdName":"cheese","Descr":"Testing to see if I can add an existing respondent"},{"RecordID":1,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-31T23:14:14.873Z","UpdName":"cheese","Descr":"[RESOLVED]"},{"RecordID":2,"Respondent":"Fire-Fighting","UpdTime":"2019-03-28T19:44:56.247Z","UpdName":"cheese","Descr":"2 killed"},{"RecordID":2,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-28T21:44:29.763Z","UpdName":"ted","Descr":"One of the cars drove off"},{"RecordID":2,"Respondent":"Emergency Ambulance","UpdTime":"2019-04-01T14:51:38.390Z","UpdName":"cheese","Descr":""},{"RecordID":2,"Respondent":"Emergency Ambulance","UpdTime":"2019-04-01T14:54:27.333Z","UpdName":"cheese","Descr":""},{"RecordID":3,"Respondent":"Police Force","UpdTime":"2019-03-28T22:27:38.840Z","UpdName":"ted","Descr":"Hostages are taken"},{"RecordID":3,"Respondent":"Police Force","UpdTime":"2019-03-29T13:41:39.543Z","UpdName":"ted","Descr":"Hostage taken"},{"RecordID":3,"Respondent":"Police Force","UpdTime":"2019-03-29T13:47:10.677Z","UpdName":"ted","Descr":"Hostage saved"},{"RecordID":3,"Respondent":"Police Force","UpdTime":"2019-03-29T13:49:01.043Z","UpdName":"ted","Descr":"[RESOLVED]Bank robbers captured"},{"RecordID":4,"Respondent":"Counter Terrorism","UpdTime":"2019-03-28T22:26:44.263Z","UpdName":"ted","Descr":"[RESOLVED]"},{"RecordID":5,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-28T23:52:07.850Z","UpdName":"ted","Descr":"[RESOLVED]"},{"RecordID":6,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-28T23:17:12.890Z","UpdName":"ted","Descr":"[RESOLVED]"},{"RecordID":7,"Respondent":"Animal Control","UpdTime":"2019-03-29T13:39:34.310Z","UpdName":"ted","Descr":"[RESOLVED]"},{"RecordID":8,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-30T20:47:19.897Z","UpdName":"cheese","Descr":"[RESOLVED]Every gang member has been apprehended by the police."},{"RecordID":10,"Respondent":"Emergency Ambulance","UpdTime":"2019-03-31T23:59:49.537Z","UpdName":"cheese","Descr":"the bite resulted in infection"},{"RecordID":10,"Respondent":"Animal Control","UpdTime":"2019-04-01T12:46:01.580Z","UpdName":"cheese","Descr":"[RESOLVED]"},{"RecordID":11,"Respondent":"Disease Outbreak Control","UpdTime":"2019-03-31T22:39:35.437Z","UpdName":"cheese","Descr":"Precautions are taken and the outbreak is controlled."},{"RecordID":12,"Respondent":"Police Force","UpdTime":"2019-03-31T23:13:57.413Z","UpdName":"cheese","Descr":"Teams were sent to investigate the tip"},{"RecordID":12,"Respondent":"Police Force","UpdTime":"2019-03-31T23:59:07.583Z","UpdName":"cheese","Descr":"[RESOLVED]False report"},{"RecordID":13,"Respondent":"Flood Control","UpdTime":"2019-04-01T12:47:26.230Z","UpdName":"cheese","Descr":"the flood was intentional"},{"RecordID":29,"Respondent":"Police Force","UpdTime":"2019-04-01T13:09:13.090Z","UpdName":"cheese","Descr":"Someone cut the gas pipe"},{"RecordID":29,"Respondent":"Emergency Ambulance","UpdTime":"2019-04-01T13:10:05.993Z","UpdName":"cheese","Descr":"[RESOLVED]"}]]
        it("should return a result object"), function() {
            incidentDataProcessing(validData)
            .then((resp) => {
                expect(resp);
            })
            .catch((err) => {
                fail(err);
            })
        };
    });
    describe("invalidData", function() {
        it("should throw an error because no data provided", function() {
            incidentDataProcessing().then((resp) => {
                fail("should have thrown an error");
            }).catch((err) => {
                expect(err);
            });
        });
    });
});