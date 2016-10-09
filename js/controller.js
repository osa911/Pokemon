var pokemon = angular.module("pokemon", ['ngStorage']);
// ================================================== Роутинг  начало ==================== 

// ================================================== Контроллер  начало ==================== 
pokemon.controller("pokemonController", function($scope,$localStorage,$http) {
	$scope.Pokemons =[];
	$scope.load = true;
	$scope.nowLoad = false;
	$scope.limit = 24;
	$scope.offset = 0;
	$scope.likeItem = $localStorage.likeItem || [];
	$scope.$watch('likeItem', function() { $localStorage.likeItem = $scope.likeItem; }, true);
		    
//url для картинок http://pokeapi.co/media/img/56.png
//дергаем с "сервака" 
	$scope.loadData = function(numb){
		if (numb){
			if (numb<0) numb=0;
			var url = "http://pokeapi.co/api/v1/pokemon/?limit="+$scope.limit+"&offset="+numb;
		} else{
			var url = "http://pokeapi.co/api/v1/pokemon/?limit="+$scope.limit;
		}	
		var getData = function () {
			$http.get(url).then(function (response) {
				$scope.dataPokemons = response.data.objects;
				$scope.data_total_count = response.data.meta.total_count;
				//console.log(response.data)
				$scope.load = false;
				$scope.nowLoad = false;
				$scope.offset=numb;
				
			});
		}	
		if(!$scope.nowLoad){
			getData();
			$scope.nowLoad = true;
		}
		
	}

	$scope.focusItem=function (item) {
		if (item) {
			$scope.focusedItem = item;
		} else{
			$scope.focusedItem = "";
		}
	}

	$scope.likeItemFunc=function (item) {
		if ($scope.likeItem.length>0) {
			var statusLikeItem;
			for (var i = $scope.likeItem.length - 1; i >= 0; i--) {
				if ($scope.likeItem[i].national_id === item.national_id){
					$scope.likeItem.splice(i,1); // удаляем 
					statusLikeItem=1;
					break;
				} else {
					statusLikeItem=0;
				}
			}
			if (statusLikeItem==0) {
				$scope.likeItem.push(item); //добавляем
			}
		} else {
			$scope.likeItem.push(item);
		}
	}
	
	$scope.readlikeItemArr=function(item){
		var status;
		for (var i = $scope.likeItem.length - 1; i >= 0; i--) {
			if ($scope.likeItem[i].national_id == item.national_id) {
				status=1;
			} 
		}
		return status;
	}

});

// ================================================== Контроллер  конец ==================== 
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
// ************************************************** Сервисы  начало ********************






// ************************************************** Сервисы  Конец ********************
//--------------------------------------------------------------------------------------------------------------------


