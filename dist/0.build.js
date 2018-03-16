$scope.showFile = function(){
    	if($scope.fileToUpload){
    		console.log($scope.fileToUpload)
        	if( $scope.fileToUpload.type.indexOf("image")>-1){
				$scope.preview = true;
				fileReader.readAsDataURL($scope.fileToUpload,$scope).then(function(result){
					$scope.imageSrc = result;
				})
			}
        	if($scope.fileToUpload.name.lastIndexOf(".")>-1){
				extName = $scope.fileToUpload.name.substring($scope.fileToUpload.name.lastIndexOf(".")+1);
			}
        	//支持常用的图片及文本格式
        	var listExtName = new Array("jpg","png","jpeg","txt","xls","doc","docx","xlsx","pdf","JPG","PNG","JPEG","TXT","XLS","DOC","DOCX","XLSX","PDF");
        	var flag = 0;
        	for(var i = 0;i < listExtName.length; i++){
        		if(listExtName[i]==extName){
        			flag++;
        		}
        	}
        	if(flag == 0){
        		$scope.fileLoading = "不能上传此种格式的文件";
        	}else{
        	if($scope.fileToUpload.size > 512000){
        		$scope.fileLoading = "文件不能超过500KB";
        	}else{
        		$scope.fileLoading = "上传中...";
                sendFile();
        	}
        	}
		}
	};
