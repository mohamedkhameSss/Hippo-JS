export class navleft 
{
    constructor(){
        this.colseNav()
        this.openNav()
    }
    colseNav()
    {
        $('#close-nav').click(function () {
            console.log("work");
            $('.nav-content').animate({left:-250}).fadeIn(500)
            $('.nav-body').animate({width : 45},1000 ,function () {
                $('.fa-hippo').addClass('fa-beat')
                $('.fa-xmark').addClass('d-none')
                
                
                
            })
        })
    }
    openNav()
    {
        $('.fa-hippo').click(function () {
            console.log("ssssssssssssssssss");
            $('.nav-body').animate({width : 300},1000 )
            $('.nav-content').animate({left:0},1800)
                $('.fa-xmark').removeClass('d-none')
                $('.fa-hippo').removeClass('fa-beat')
                
                
            
            
        
    
        })
    }
}