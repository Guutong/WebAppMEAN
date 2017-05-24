angular.module('flapperNews', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('posts', [function() {
        var obj = {
            posts: [{
                title: 'hello',
                link: '',
                upvotes: 5
            }]
        };
        return obj;
    }])
    .controller('MainCtrl', [
        '$scope', 'posts',
        function($scope, posts) {
            $scope.test = 'Hello world!';

            $scope.posts = posts.posts;

            $scope.addPost = function() {
                $scope.posts.push({
                    title: $scope.title,
                    upvotes: 0,
                    link: $scope.link
                });
                $scope.title = '';
                $scope.link = '';
            }

            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1;
            };
        }
    ]);