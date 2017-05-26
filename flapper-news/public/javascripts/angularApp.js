var app = angular.module('flapperNews', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts) {
                            return posts.getAll();
                        }]
                    }
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('posts', ['$http', function($http) {
        var obj = {
            posts: []
        };
        obj.getAll = function() {
            return $http.get('/posts').success(function(data) {
                angular.copy(data, obj.posts);
            });
        }
        obj.create = function(post) {
            return $http.post('/posts', post).success(function(data) {
                obj.posts.push(data);
            });
        };
        obj.upvote = function(post) {
            return $http.put('/posts/' + post._id + '/upvote')
                .success(function(data) {
                    post.upvotes += 1;
                });
        };

        return obj;
    }])
    .controller('MainCtrl', [
        '$scope', 'posts',
        function($scope, posts) {
            $scope.test = 'Hello world!';
            $scope.posts = posts.posts;
            $scope.addPost = function() {
                if (!$scope.title || $scope.title === '') { return; }
                posts.create({
                    title: $scope.title,
                    link: $scope.link,
                });
                $scope.title = '';
                $scope.link = '';
            }
            $scope.incrementUpvotes = function(post) {
                posts.upvote(post);
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