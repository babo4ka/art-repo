import robot_img from '../robot.png';
import './SoldOut.scss'

const SoldOut = ()=>{
    const thx_txt = "Oh my god! O_O This is sold out! " + 
    "Guys, I am so happy that you liked my drawings ^-^ " + 
    "I got a big portion of motivation to explore your world!";

    return(
        <div className="container-fluid sold_out_holder">
            <div className="row">
                <div className="col-12">
                    {thx_txt}
                </div>

                <div className="col-4">
                    <img id="robot_img" src={robot_img}></img>
                </div>
            </div>
        </div>
    )
}

export default SoldOut;