var friends = require('../data/friend');
var path = require('path');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        return res.json(friends);
    });

    app.post('/api/friends/new', function (req, res) {
        var newFriend = req.body;
        var compatible = [];
        var compatibilityScore = [];
        friends.push(newFriend);
        for (var i = 0; i < friends.length; i++) {
            if (friends[i].name !== newFriend.name) {
                var score =
                    Math.abs(parseInt(friends[i].questionResponse1) - parseInt(newFriend.questionResponse1)) +
                    Math.abs(parseInt(friends[i].questionResponse2) - parseInt(newFriend.questionResponse2)) +
                    Math.abs(parseInt(friends[i].questionResponse3) - parseInt(newFriend.questionResponse3)) +
                    Math.abs(parseInt(friends[i].questionResponse4) - parseInt(newFriend.questionResponse4)) +
                    Math.abs(parseInt(friends[i].questionResponse5) - parseInt(newFriend.questionResponse5));
                console.log(score);
                compatibilityScore.push(score);
                compatible.push({
                    name: friends[i].name,
                    score: score,
                });
                console.log(compatibilityScore);
                console.log(compatible);
            }
        }
        compatibilityScore.sort(function (a, b) {
            return a - b
        });
        var bestMatches = [];
        for (var k = 0; k < compatible.length; k++) {
            if (compatible[k].score === compatibilityScore[0])
                bestMatches.push(compatible[k]);
        }
        console.log("New Friend Added!!");
        console.log(bestMatches);
        res.json(bestMatches);
    });
}