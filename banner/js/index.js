function Carousel(arr) {
    this.wrap = arr.wrap;
    this.wrapId = arr.wrap.id;              
    this.wrapWidth = this.wrap.offsetWidth; 
    this.activePage = 0;                    
    this.imgNumber = arr.urlObj.length;     
    this.settimeID;                        
    this.init(arr.urlObj);
}


Carousel.prototype = {
    constructor: Carousel,          
    init: function(urlObj) { 
        this.wrap.style.position = "relative";
        this.wrap.style.overflow = "hidden";
        this.wrap.innerHTML = '<span id="' + this.wrapId + '_pre" class="fa fa-angle-left fa-3x"></span><span id="' + this.wrapId + '_next" class="fa fa-angle-right fa-3x"></span><ul id="' + this.wrapId + '_page"></ul><div id="' + this.wrapId + '_container"></div>';
        let container = document.getElementById(this.wrapId + '_container');
        let page = document.getElementById(this.wrapId + "_page");
        for (let value of urlObj) {      
            container.innerHTML += '<div class="' + this.wrapId + '_img-item"><img src="' + value + '"></div>';
            page.innerHTML += '<li class="' + this.wrapId + '_pagination"></li>';
        }
        container.style.width = this.imgNumber + "00%";
        container.style.left = 0;
        for (let value of document.getElementsByClassName(this.wrapId + "_img-item")) {
            value.style.width = 100 / this.imgNumber + "%";
        }
        document.getElementsByClassName(this.wrapId + "_pagination")[this.activePage].id = this.wrapId + "_active";        
        this.pageActiveColor();
        this.setTime();
        this.bindEvent();
    },
    pageActiveColor: function() {      
        document.getElementById(this.wrapId + "_active").id = "";
        document.getElementsByClassName(this.wrapId + "_pagination")[this.activePage].id = this.wrapId + "_active";
    },
    bindEvent:function() {               
        let preAngle = document.getElementById(this.wrapId + "_pre");
        let nextAngle = document.getElementById(this.wrapId + "_next");
        let pageUl = document.getElementById(this.wrapId + "_page");
        let pages = pageUl.getElementsByClassName(this.wrapId + "_pagination");
        for (let key = 0; key < pages.length; key++) {
            pages[key].addEventListener("click", this.selectPage.bind(this, key));
        }
        this.wrap.addEventListener("mouseenter", this.clearTime.bind(this));
        this.wrap.addEventListener("mouseleave", this.setTime.bind(this));
        preAngle.addEventListener("click", this.leftAngleclick.bind(this));
        nextAngle.addEventListener("click", this.rightAngleclick.bind(this));
    },
    leftAngleclick:function() {     
        let container = document.getElementById(this.wrapId + "_container");
        if(this.activePage == 0) {       
            this.activePage = this.imgNumber - 1;
        } else {
            this.activePage--;
        }
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    rightAngleclick:function() {      
        let container = document.getElementById(this.wrapId + "_container");
        if (this.activePage == this.imgNumber - 1) {
            this.activePage = 0;
        } else {
            this.activePage++;
        }
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    selectPage:function(selectNum) {     
        this.activePage = selectNum;
        let container = document.getElementById(this.wrapId + "_container");
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    setTime:function() {                
        let wrapId = this.wrapId;          
        this.settimeID = setInterval(function() {
            document.getElementById(wrapId + "_next").click();
        } , 3000);
    },
    clearTime:function() {       
        let theId = this.settimeID;        
        clearInterval(theId);        
    }

}