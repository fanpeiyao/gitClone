<div class='changePhone'>
	<div class='changePhone-title '>请输入新手机号</div>
	
	<div class='new-formBox'>
	
		<form name="checkcodeForm" novalidate> 
			<fieldset>
				<div class="fn-form-group">
					<div class="fn-g fn-g-collapse">
						<div class="fn-input-group fn-input-group-secondary fn-u-sm-8">
							<span class="fn-input-group-label">手机号：</span>  
								<input type="tel"
								name="mobilephone" ng-model="mobilephone" minlength="11"
								maxlength="11" ng-pattern="/^1[3|5|7|8][0-9]\d{8}$/" required
								class="fn-form-field" placeholder="新手机号">
						</div>
						<div class="fn-u-sm-4 check-node" >
							<button class="fn-btn  fn-btn-block skin-color code-btn"
								ng-disabled="checkcodeForm.mobilephone.$invalid || countingDown" disabled="disabled"
								ng-click="getValidateCode(mobilephone)"  ng-bind="getCodeText">获取验证码</button>
						</div>
					</div>
					
					
			</fieldset>
		    <fieldset>
		        <div class="fn-form-group" >
		        	
			            <div  class="fn-input-group fn-input-group-secondary">
			              <span class="fn-input-group-label">验证码：</span>
			                <input type = "tel" class="fn-form-field" ng-model="validateCode" required maxlength="6"
			                       minlength="6" placeholder="请输入验证码">
			            </div>
		        </div>
		    </fieldset>
		</form> 
	
	
	</div>
	
	
	<div class='new-buttonBox' >
         <button  class="fn-btn-block skin-back"
         ng-disabled="checkcodeForm.$invalid" disabled="disabled"
			ng-click="changePhone(mobilephone,validateCode)"
         >确认</button>
    </div>
	<div class="fn-text-danger fn-margin-bottom padding-16"
						ng-show="checkcodeForm.mobilephone.$invalid && checkcodeForm.mobilephone.$dirty">
		<div class="box_error ">
			 <div>请输入正确的手机号</div>
		</div>
	</div>
			
	 <div class="fn-text-danger fn-margin-bottom padding-16" ng-show = "checkcodeForm.validateCode.$error">
	 
		  <div class="box_error ">
				 <div> 请输入6位验证码</div>
			</div>
	 </div>
	 
	 <div class="fn-text-danger fn-margin-bottom padding-16" ng-show = "showTip">
	 
		  <div class="box_error2 ">
				 <div> 短信验证码以向您的手机发送，请在输入框内填入您收到的验证码！</div>
			</div>
	 </div>
	     				
</div> 
