zcpe.controller('QuizCtrl', ['$scope', '$location', '$http', '$localStorage', '$controller', 'evaluator', 'quizCreator', function ($scope, $location, $http, $localStorage, $controller, evaluator, quizCreator) {
    var sessionData = $localStorage.sessionData;
    
    $controller('QuizzCtrl', {$scope: $scope});
    
    $scope.finish = function () {
        $scope.currentQuestion = null;
        $scope.finished = true;
        
        var score = evaluator.evaluate($scope.quizz);
        
        $http({
            url: config.restServer + '/session/finish/' + sessionData.id,
            method: 'POST',
            data: score
        });
        
        $localStorage.score = score;
        $localStorage.sessionData = null;
        
        $location.path('/result');
    };
    
    $scope.timerFinished = function () {
        $scope.finish();
    };
    
    $scope.init(quizCreator.createQuiz(sessionData));
    $scope.start();
}]);