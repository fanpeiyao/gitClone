 $scope.getValidateCode = function(mobilePhone,loginName){
             		 var promise = LoginService.getValidateCode(mobilePhone,loginName);
             		 promise.then(function(result){
             			 if(result.retCode !== "200"){   
                              $modal.alert(result.retMsg||"您的账号暂不能使用忘记密码功能，请联系企业咨询!")
                              $scope.showTip = false;
                          }else{
                        	  $scope.showTip = true;
                          }
             		 })
                     //点击之后 倒计时
            		 $scope.countingDown = true;
                     var i = 60;
                     var timer = $interval(tick,1000,60);
                     function tick(){
                         i--;
                         $scope.getCodeText = "请等待("+i+")s";
                     }
                     timer.then(function(){
                    	 $scope.getCodeText = "获取验证码";
                    	 $scope.countingDown = false;
                     })
            	  }
      
			      $scope.goBack = function(){
			      	$rootScope.transition = "slide-left";
			      	$timeout(function(){
			              if($scope.backState )
			                  $state.go($scope.backState);
			      	})
			      };
