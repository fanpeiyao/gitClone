   <script type="text/javascript">

        var template =  "全部{{ appid.common.currentCompany }}"
        // var template =  "全部{{common.currentCompany }}"
        is3n(template,'s3Core')
        console.log(is3n(template,'s3Core'))
    </script>

var properties = {
    's3Core':{
        'common':{
            'currentCompany':'分公司'
        },
        'order':{
            'currentCompany':'分部门'
        },
    }
}
