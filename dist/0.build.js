<div class='dealerListBox-top'>
							<ul class="fn-list dealerListBox" >
								<li >
									<div class="fn-u-sm-2">
										<i class="iconfont fn-color-org icon-gerenzhongxin"></i>
									</div> 
									<a class="fn-u-sm-10 skin-color"> 
										当前经销商：
										<span ng-bind='oper.OperatorEntityuserName'></span>
									</a>
								</li>
							</ul>
							<!-- 搜索 -->
							<div id="dealerSearch" class="fn-cf search-nav  newSearchInput skin-padding ">
				  
								<form class="payment  fn-fl "   ng-submit="dealerSearch(dealersearchVal)"  >
						            <i class="iconfont icon-sou p2  skin-white-color" ></i>
						            <a>
						                <input type="text"  placeholder="经销商编号/经销商名称" class="payment-input  skin-white-color" ng-model="dealersearchVal" >
						            </a>
						            <i class="iconfont icon-guanbi1  fn-fr skin-white-color" ng-click='dealerclickClean($event)'></i>
						        </form>
	       
	       						<span class=" skin-color fn-fr" ng-click="dealerSearch(dealersearchVal)">搜索</span>
						    </div>
						    
						</div>
						
						
						<ul class="fn-list dealerListBox" id='dealerListBox'>
							<li ng-repeat="dealer in dealerList" ng-click="changeDealer(dealer)">
								<div class="fn-u-sm-2"> 
									<i class="iconfont"
										ng-class="{'icon-queren skin-color': oper.OperatorEntitycustomId ==  dealer.customerId,'icon-yuanquan':oper.OperatorEntitycustomId !=  dealer.customerId}"></i>
								</div> 
								<a class="fn-u-sm-10"> 
									<span ng-bind="dealer.customerId"></span>
									<span ng-bind="dealer.userName"  ng-class="{'fn-margin-left-sm':dealer.customerId !=undefined}" ></span>
								</a>
							</li>
						</ul>
						
						
					</div>
					<div class='arrowBox'  ng-if='allPage > 0'>
						<ul class="fn-pagination">
								<li class="fn-pagination-prev fn-disabled"><a  ng-click='arrowLeft()'>«上一页</a></li>
								<li class="fn-pagination-next"><a ng-click='arrowRight()'>下一页»</a></li>
						</ul>
					</div>
