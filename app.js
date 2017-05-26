var app = angular.module('flapperNews', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('posts', [function() {
        var obj = {
            posts: []
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
                    link: $scope.link,
                    comments: [
                        { author: 'Joe', body: 'Cool post', upvotes: 0 },
                        { author: 'Bob', body: 'Yahoooooo', upvotes: 0 },
                        { author: 'Adam', body: 'Nice!', upvotes: 0 }

                    ]
                });
                $scope.title = '';
                $scope.link = '';
            }

            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1;
            };
        }
    ])
    .controller('PostsCtrl', [
        '$scope', '$stateParams', 'posts',
        function($scope, $stateParams, posts) {
            $scope.post = posts.posts[$stateParams.id];
            $scope.addComment = function() {
                if ($scope.body === '') {
                    return;
                }
                $scope.post.comments.push({
                    body: $scope.body,
                    author: 'user',
                    upvotes: 0
                });
                $scope.body = '';
            }
        }
    ]);