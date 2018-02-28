
	 const node=document.createElement("input");
    document.body.appendChild(node);
    it("underscore_debounce", () => {

        function testFn() {
            console.log('333');
        }
        var input  = document.getElementsByTagName("INPUT")[1];
        input.onkeyup =  s3.debounce(testFn, 300 );
    });


    it("underscore_throttle", () => {
        let div=document.createElement("div"),count = 0;
        document.body.appendChild(div);
        var demo = document.getElementsByTagName("div")[0];
        function underscore_throttle() {
            demo.innerHTML += 'underscore_throttle 被调用了' + ++count +'次<br>';
        }
        window.onresize = s3.throttle(underscore_throttle,200)
    });
