import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

class MainPage extends Component{
  
  
  render(){
      return(
        <div>
            <Header color='info' brand='Airport' transparent rightLinks={<HeaderLinks/>} fixed/>
            <Parallax filter image={require('assets/img/plane-wallpaper.jpg').default} />
            <Card style={{margin: 'auto', maxWidth: 750}}><CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ante dui, ornare vel porttitor pulvinar, egestas vitae neque. Nam luctus vehicula mauris vel consequat. Quisque congue dictum augue, quis maximus tortor commodo eu. Phasellus placerat neque sem, vel tristique massa dictum vel. Aliquam mattis ante nec sapien porttitor, lacinia sodales diam ultricies. Mauris auctor aliquet enim, eget sollicitudin leo rutrum eu. Etiam id dapibus ligula. Aenean rhoncus eros quis tincidunt convallis. Praesent ultricies nibh non volutpat bibendum. Sed blandit faucibus dolor, ac euismod dolor tincidunt eget. Etiam sed porta libero. Ut elementum ornare tellus a suscipit.

                        Aenean eget varius justo. Cras quis ullamcorper tortor. Proin a efficitur diam. Curabitur vitae neque libero. Nunc dapibus, odio id rutrum sollicitudin, mi dui semper tortor, eu mollis augue nisi convallis nisi. Fusce varius faucibus venenatis. Maecenas tortor lacus, tempus ut ligula id, pretium tempor eros. Vestibulum tincidunt enim non sem viverra, in lobortis orci finibus. Phasellus id libero suscipit, finibus enim eget, varius sapien. Phasellus bibendum nunc finibus, dignissim sapien vel, porttitor odio.
                        
                        Pellentesque dapibus justo quis diam dapibus dapibus in at ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ullamcorper ac magna id faucibus. Vestibulum commodo lobortis tincidunt. Duis sed placerat eros. Duis ut dui at arcu venenatis aliquam. Aliquam eget cursus odio. Fusce vulputate nunc sed gravida rhoncus. Pellentesque dapibus cursus neque a hendrerit. Curabitur dignissim lectus id nisi ornare, a facilisis arcu tempus. Nullam vestibulum tempor libero, eget sodales quam faucibus et. Praesent tempor est sem, at interdum turpis lobortis ut.
                        
                        Proin facilisis fermentum nulla vitae aliquam. Suspendisse vitae diam vel mauris auctor tincidunt. Aliquam a ullamcorper justo. Nam vitae auctor est, quis varius nisi. Sed sollicitudin sapien eget augue dignissim, et pharetra nibh tincidunt. Sed viverra, justo non mollis condimentum, arcu dolor rhoncus arcu, vitae facilisis arcu velit vel risus. Phasellus eu bibendum erat. Integer vel risus a est mollis molestie. In venenatis enim ac gravida venenatis. In placerat turpis ut consequat mollis.
                        
                        Sed felis felis, condimentum at elementum nec, egestas et nulla. Quisque nisi tellus, convallis in ultricies vitae, varius at nisi. Quisque felis nisl, consequat et diam id, tristique elementum erat. Proin a neque sodales, fermentum orci ac, facilisis neque. Aenean ac tincidunt lacus. Integer et fringilla orci. Aliquam sed est pharetra, venenatis dolor a, auctor ipsum. Nunc finibus sem id velit vestibulum efficitur. Ut vel leo lacinia, bibendum turpis sit amet, aliquam lacus. Proin dui nisl, faucibus vitae suscipit eu, aliquet non enim.

            </CardBody></Card>           
                        

        </div>

      );
    }
  


}

export default MainPage ;