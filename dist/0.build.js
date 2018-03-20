<div class='changephoneBox' auto-height>
	<div>
	<div class="first-login-tig">
		<p class='changeNode-txt'>首次登陆请先绑定你的手机号码</p>
		<p class='changeNode-txt'>并修改密码</p>
	</div>
	<form name="bindphoneForm" novalidate> 
		<div class='new-formBox'>
			<fieldset>
				<div class="fn-form-group">
					<div class="fn-g fn-g-collapse">
						<div class="fn-input-group fn-input-group-secondary fn-u-sm-8">
							<span class="fn-input-group-label">绑定手机：</span>  
								<input type="tel"
								name="mobilephone" ng-model="mobilephone" minlength="11"
								maxlength="11" ng-pattern="/^1[3|5|7|8][0-9]\d{8}$/" required
								class="fn-form-field" placeholder="输入你的手机号">
						</div>
						<em class='split-em'>|</em>
						<div class="fn-u-sm-4 check-node" style='padding-left:.5rem'>
							<button class="fn-btn  fn-btn-block skin-color code-btn"
								ng-disabled="bindphoneForm.mobilephone.$invalid || countingDown" disabled="disabled"
								ng-click="getValidateCode(mobilephone)" ng-bind="getCodeText"></button>
						</div>
					</div>
			</fieldset>
		    <fieldset>
		        <div class="fn-form-group" >
		        	
			            <div  class="fn-input-group fn-input-group-secondary">
			              <span class="fn-input-group-label">校验码：</span>
			                <input type = "tel" class="fn-form-field" ng-model="validateCode" required maxlength="6"
			                       minlength="6" ng-maxlength="6"
			                       ng-minlength="6" placeholder="输入你的手机校验码">
			            </div>
		        </div>
		      
		    </fieldset>
			
		</div>
		
		<div class='new-formBox'>
				<fieldset>
					<div class="fn-form-group">
						<div class="fn-g fn-g-collapse">
							<div class="fn-input-group fn-input-group-secondary fn-u-sm-8">
								<span class="fn-input-group-label">旧密码：</span>  
									<input type="password"
									class="fn-form-field" ng-model="oldPassword"
									required name="oldPassword" 
									placeholder="请输入你的旧密码" autocomplete="off">
							</div>
						</div>
				</fieldset>
				<fieldset>
					<div class="fn-form-group">
						<div class="fn-g fn-g-collapse">
							<div class="fn-input-group fn-input-group-secondary fn-u-sm-8">
								<span class="fn-input-group-label">新密码：</span>  
									<input type="password"
									class="fn-form-field" ng-model="password"
									required name="password" ng-maxlength="16" ng-minlength="8"
									ng-pattern="/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![@#$%^&]+$)[0-9A-Za-z@#$%^&]{8,16}$/"
									placeholder="请输入你的新密码" autocomplete="off">
							</div>
						</div>
				</fieldset>
			    <fieldset>
			        <div class="fn-form-group" >
			        	
				            <div  class="fn-input-group fn-input-group-secondary">
				              <span class="fn-input-group-label">确认密码：</span><input
								type="password" class="fn-form-field" name="repeatPassword"
								equalTo="#Password" ng-model="repeatPassword" required
								placeholder="再次请确认您的新密码" autocomplete="off">
				            </div>
			        </div>
			      
			    </fieldset>
		</div>
	
	</form> 
	
	
	
	
	<div class='new-buttonBox' >
         <button  class="fn-btn-block skin-back"
         ng-disabled="bindphoneForm.$invalid || password !== repeatPassword" disabled="disabled"
			ng-click="firstLogin(mobilephone,validateCode,oldPassword,password,repeatPassword)"
         >确认</button>
    </div>
    
	<div class="fn-text-danger fn-margin-bottom padding-16"
						ng-show="bindphoneForm.mobilephone.$invalid && bindphoneForm.mobilephone.$dirty">
		<div class="box_error ">
			 <div>请输入正确的手机号</div>
		</div>
	</div>
			
	 <div class="fn-text-danger fn-margin-bottom padding-16" ng-show = "bindphoneForm.validateCode.$error">
	 
		  <div class="box_error ">
				 <div> 请输入6位验证码</div>
			</div>
	 </div>	
	 <div class="fn-text-danger fn-margin-bottom padding-16"
		ng-show="showTip">

		<div class="box_error2 ">
			<div>短信验证码以向您的手机发送，请在输入框内填入您收到的验证码！</div>
		</div>
	</div>
	<div class=" fn-margin-bottom padding-16"
		ng-show="bindphoneForm.loginName.$invalid && bindphoneForm.loginName.$touched">
		<div class="box_error ">
			<div>请输入登录名</div>
		</div>
	</div>
	<div class='fn-margin-bottom padding-16'
		ng-show="bindphoneForm.oldPassword.$invalid && bindphoneForm.oldPassword.$touched">
		<div class="box_error ">
			<div>请输入旧密码</div>
		</div>
	</div>
	<div class='fn-margin-bottom padding-16'
		ng-show="bindphoneForm.password.$invalid && bindphoneForm.password.$dirty">
		<div class="box_error ">
			<div>请输入8-16位新密码,必须包含数字、大写字母、小写字母、特殊字符这四种类型中的两种</div>
		</div>
	</div>

	<div class='fn-margin-bottom padding-16'
		ng-show="password !== repeatPassword && bindphoneForm.repeatPassword.$touched">
		<div class="box_error ">
			<div>两次密码不一致</div>
		</div>
	</div>
	 
	 <div class='warningBox PWform fn-padding-top'>
		<p class='fn-margin-bottom changeNode-txt'>温馨提示</p>
		<p class='nor-txt'>请将密码设置为8（含）位以上，必须包含数字、大写字母、小写字母、特殊字符这四种类型中的两种</p>
		<p class='nor-txt'>为了保护您的账户的安全请不要将密码设置为其他网站相同的密码；</p>
		<p class='nor-txt'>建议您每隔一段时间修改您的密码，以防密码泄露。</p>
	</div>
	
	
</div>
</div>
