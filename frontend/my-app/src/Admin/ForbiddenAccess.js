import React, {Component} from 'react'

class ForbiddenAccess extends Component{
  
/*  */

  render(){
      return(
        <div class="container" >
        <div class="image" style={{position: "absolute",top: "100px",left: "550px"}}>
           <img src="https://cdn-01.media-brady.com/store/stuk/media/catalog/product/cache/3/image/85e4522595efc69f496374d01ef2bf13/1563992321/d/m/dmeu_pr021am_58589__std.lang.all.jpg"/>
        </div>
        <div>
        <footer style={{position:"fixed",bottom:0,height: "151px"}}>
        <img src="https://www.pngkey.com/png/full/122-1220928_are-you-a-health-professional-wave-footer-png.png" style={{objectFit:"contain",width:"100%",bottom:0}}/>
        </footer>
        </div>
     </div>
      );
    }
  


}

export default ForbiddenAccess ;