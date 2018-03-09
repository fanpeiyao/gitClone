/**
 * Created by chent on 2017/3/3.
 */
var config = {};
config.basic = {};
config.display = {};
config.modules = {};


//PART I    BASIC
config.basic.companyName = "ABC有限公司电子供应链平台";
config.basic.logo = "views/account/img/logo.png";
config.basic.theme = "skinRed";


//PART II   DISPLAY
config.display.products = {
		productName:'产品名称',
		productType:'产品类型',
		productSize:'规格',
		productAddress:'规格',
		batch:'批号',
		standardLen:'批号',
		count:'数量',
		arrangedCount:'发货数量',
		weight:'重量',
		countUnit:'单位',
		weightUnit:'重量单位',
		cost:'重量单位',
		price:'单价',
		realPrice:'单价',
		note:'备注',
		toDate:'要货日期',
		categoryId:'分类号',
		categoryName:'分类名',
		createTime:'要货日期',
		picFilePath:'要货日期',
		picFileName:'要货日期',
		shipFee:'要货日期',
		companyId:'分公司编号',
		salesmanId:'要货日期',
		parentId:'分公司编号',
		lastUpdateTime:'分公司编号',
		rd1:'属性',
		rd2:'产品颜色',
		rd3:'属性',
		rd4:'属性',
		rd5:'属性',
		rd6:'属性',
		rd7:'属性',
		rd8:'属性',
		rd9:'属性',
		rd10:'属性',
		rd11:'属性',
		rd12:'属性',
		rd13:'属性',
		rd14:'属性',
		rd15:'属性',
		rd16:'属性',
		rd17:'属性',
		rd18:'属性',
		rd19:'属性',
		rd20:'属性',
		rd21:'属性',
		rd22:'属性',
		rd23:'属性',
		rd24:'属性',
		rd25:'属性',
		rd26:'属性',
		rd27:'属性',
		rd28:'属性',
		rd29:'属性',
		rd30:'属性'	
}


//PART III   MODULES
config.modules.profile = {
}

config.modules.products = {
		filter:[
				{key:"rd1",name:"产品属性",values:["呵呵","呵呵啊"]},
				{key:"rd2",name:"产品颜色",values:["红色","绿色"]}
			],
	props:['picFilePath','productName','categoryId','productSize','rd2','countUnit'],
    productDetail:['productName','productSize','categoryId','countUnit']
}

config.modules.cart = {
    	payMethod:{
    		name:'支付方式',
    		options:[
    		    	    {type:0,name:'汇款'},
    		    	    {type:1,name:'票据'},
    		    	    {type:2,name:'信用证'},
    		    	    {type:3,name:'其他方式'}
    		    	]
    	},
    	deliveryType:{
    		name:'配送方式',
    		options:[
	     	    {
	     	    	type:0,
	     	    	name:"自提"
	     	    },
	     	    {
	     	    	type:1,
	     	    	name:"配送"
	     	    }
	     	    ]
    	},
    	toDate:{
    		name:"要货日期",
    		type:"date"
    	},
    	rd1:{
    		name:'特殊备注',
    		type:'textarea'
    	},
    	rd2:{
    		name:"选择订单类型",
    		type:'select',
    		options:['xxxx单据类型1','xx单据类型2','xxx单据类型3']
    	},
    	props:[
    	       {key:'picFilePath',type:'img'},
    	       {key:'productName',type:'text'},
    	       {key:'categoryId',type:'text'},
    	       {key:'productSize',type:'text'},
    	       {key:'rd2',type:'input'},
    	       {key:'price',type:'input'},
    	       {key:'toDate',type:'input'}
    	      ]	
}

config.modules.myorder = {
	        	status:[
						{id:"0", name:'未审核'},
						{id:"1",name:'已审核'},
						{id:"2",name:'已作废'},
						{id:"3",name:'已核销'}
	        	        ],
    			filter:[
					{key:"rd1",name:"产品属性",values:["呵呵","呵呵啊"]},
					{key:"rd2",name:"产品颜色",values:["红色","绿色"]}
				],
	        	list:[
						{key:"orderNo",name : '订单编号'},
						{key:"createTime",name: '创建时间'},
						{key:"statusName",name : '订单状态'},
						{key:"companyId",name : '分公司编号'}
	        	      ],
	        	detail:[
					{key:"orderNo",name : '订单编号'},
					{key:"createTime",name: '创建时间'},
					{key:"statusName",name : '订单状态'},
					{key:"logistics",name : '物流单号'},
					{key:"companyId",name : '分公司编号'},
					{key:"address",name : '地址'},
					{key:"payMethod",name:'货运方式'}
	        	      ],
	        	props:['categoryId','productSize','rd2','countUnit','price']
}

config.modules.delivery = {
    	status:[
				{id:"0", name:'未确认'},
				{id:"1",name:'已确认'}
    	        ],
    	        filter:[
    					{key:"rd1",name:"产品属性",values:["大","小"]},
    					{key:"rd2",name:"产品颜色",values:["黑","白"]}
    				],
		list:[
		      {key:"deliveryId",name:"发货单编号"},
		      {key:"amount" ,name: '发货单金额'}
		      ],
		detail:[
		        {key:"deliveryId",name:"发货单编号"},
		        {key:"createTime",name: '创建时间'},
		        {key:"deliveryTime" ,name:'送货时间 '},
		        {key:"deliveryStatus",name : '发货单状态'},
		        {key:"amount" ,name: '发货单金额'},
		        {key:"carNum" ,name: '车号'},
		        {key:"contactor" ,name: '联系人'},
		        {key:"mobile" ,name: '移动电话'},
		        {key:"driverName",name : '送货司机'}
		      ],
    	props:['categoryId','productSize','rd2','count','countUnit']	
}

config.modules.check = {
	status:[
		{id:"0",name:'审批中'},
      	{id:"1", name:'已审批'},
      	{id:"2",name:'已作废'}
     ],
     order:{
    	 detail:[
 	         	{key:"address", name:'地址'},
 				{key:"orderNo",name : '订单编号'},
 				{key:"createTime",name: '创建时间'},
 		 ],
	 	 props:[
	 	        {key:'productName',type:'text'},
	 	        {key:'productSize',type:'text'},
	 	        {key:'rd2',type:'input'}
	 	        ]
     }
}

